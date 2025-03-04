"use client";
import React, {useEffect, useRef, useContext, useState} from "react";
import * as L from "leaflet";
import "leaflet-providers";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import "leaflet.markercluster";
import {FilterContext} from "@/app/components/filter/FilterContext";
import {isValidGeoJsonObject} from "@/app/components/helpers/utils";
import {createRoot} from "react-dom/client";
import {flushSync} from "react-dom";
import FeaturePopup from "@/app/components/map/FeaturePopup";
import {Feature, GeoJsonProperties} from "geojson";
import {useTheme} from "@mui/material/styles";
import {use_kobo_asset, use_kobo_data} from "@/app/components/kobo/data-loader";

const defaultStyle = {
    color: "blue",
    weight: 2,
    opacity: 1
};

const selectedStyle = {
    color: "green",
    fillColor: "yellow",
    weight: 4,
    opacity: 1
};

function ProjectMap() {
    const mapContainer = useRef<HTMLDivElement>(null);
    const mapRef = useRef<L.Map | null>(null);
    const layerControlRef = useRef<L.Control.Layers | null>(null);
    const {startDate, endDate} = useContext(FilterContext);
    const [featureProperties, setFeatureProperties] = useState<GeoJsonProperties>(null)
    const [openPopup, setOpenPopup] = useState<boolean>(Boolean(featureProperties))
    const theme = useTheme()

    const {data: field_data} = use_kobo_data()
    //const {data: asset} = use_kobo_asset()


    useEffect(() => {
        if (typeof window !== 'undefined' && mapContainer.current && !mapRef.current) {

            mapRef.current = L.map(mapContainer.current).setView([0, 37], 5);

            const osm = L.tileLayer.provider('OpenStreetMap');
            const openTopoMap = L.tileLayer.provider('OpenTopoMap');
            const Stadia_StamenWatercolor = L.tileLayer.provider('Stadia.StamenWatercolor');
            const Stadia_AlidadeSmooth = L.tileLayer.provider('Stadia.AlidadeSmooth');
            const Stadia_StamenToner = L.tileLayer.provider('Stadia.StamenToner');
            const baseMaps = {
                "Stadia StamenWatercolor": Stadia_StamenWatercolor,
                "Stadia AlidadeSmooth": Stadia_AlidadeSmooth,
                "Stadia StamenToner": Stadia_StamenToner,
                "OpenStreetMap": osm,
                "OpenTopo Map": openTopoMap,
            };

            Stadia_AlidadeSmooth.addTo(mapRef.current);
            layerControlRef.current = L.control.layers(baseMaps);
            layerControlRef.current.setPosition('bottomleft')
            layerControlRef.current.addTo(mapRef.current, );

            return () => {
                if (mapRef.current) {
                    mapRef.current.remove();
                    mapRef.current = null;
                }
            };
        }
    }, []);

    function zoomToFeature(e: any) {
        mapRef.current?.fitBounds(e.target.getBounds());
    }
    const onFeatureClick = (projectFeature: Feature, layer: any) => {
        layer.on({
            // 'mouseover': highlightFeature,
            "click": zoomToFeature,
            // "mouseout": resetHighlight,
        });
        console.log(projectFeature);
        setOpenPopup(true);
        console.log(`Opening popup  ${openPopup}`)
        if (
            projectFeature.properties &&
            Object.keys(projectFeature.properties).length > 0
        ) {
            setFeatureProperties(projectFeature.properties)
            const popupOptions = {
                minWidth: 100,
                maxWidth: 250,
                className: "popup-classname"
            };
            console.log('Opening popup')
            layer.bindPopup(() => {
                const div = document.createElement("div");
                const root = createRoot(div);
                flushSync(() => {
                    root.render(
                        <FeaturePopup properties={projectFeature.properties}/>)
                });
                return div.innerHTML;
            }, popupOptions);
        }
    }


    useEffect(() => {
        console.log(`TOKEN ${process.env.KOBO_TOKEN}`)
        if (mapRef.current && field_data) {
            console.log(`Field Data >>> ${field_data}`);
            const layerGroup = L.featureGroup()
            if (isValidGeoJsonObject(field_data)) {
                const geoJsonLayer = L.geoJSON(field_data, {
                    style: defaultStyle,
                    onEachFeature: (feature: Feature, layer: L.Layer) => onFeatureClick(feature, layer),
                })
                layerGroup.addLayer(geoJsonLayer);
            }


            mapRef.current.addLayer(layerGroup);
            layerControlRef.current?.addOverlay(layerGroup, "Conservancies").addTo(mapRef.current);
            const bounds = layerGroup.getBounds();
            if (bounds.isValid()) {
                mapRef.current.fitBounds(bounds);
            } else {
                console.error("Invalid bounds, unable to fit the map to the data.");
            }
        }
    }, [field_data]);

    return (
        <main>
            <div ref={mapContainer} style={defaultStyle}/>
        </main>
    );
}

export default ProjectMap;