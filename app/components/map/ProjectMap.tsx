"use client";
import React, {useEffect, useRef, useContext, useState} from "react";
import * as L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import "leaflet.markercluster";
import {FilterContext} from "@/app/components/filter/FilterContext";
import {useQueryClient} from "@tanstack/react-query";
import { useProjectLocationsQuery} from "@/app/components/helpers/api";
import {isValidGeoJsonObject} from "@/app/components/helpers/utils";
import {createRoot} from "react-dom/client";
import {flushSync} from "react-dom";
import FeaturePopup from "@/app/components/map/FeaturePopup";
import {ModalPopup} from "@/app/components/map/ModalPopup";
import InfoDrawer from "@/app/components/map/InfoDrawer";

const MAP_TILE = {
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
};

const ESRI_IMAGERY = {
    url: "http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    attribution:
        "&copy; <a href='http://www.esri.com/'>Esri</a>, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community",
    maxZoom: 18,
};
// const GEOSERVER_BASE_URL = process.env.GEOSERVER_BASE_URL
const GEOSERVER_BASE_URL = 'http://localhost:8080/geoserver'
const mapStyles: React.CSSProperties = {
    width: "100%",
    height: "100vh",
    flex: 1,
    padding: 0,
    position: "relative",
};

const customMarkerIcon = new L.Icon({
    iconUrl:
        "https://cdn.jsdelivr.net/npm/leaflet@1.7.1/dist/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

function ProjectMap() {
    const mapContainer = useRef<HTMLDivElement>(null);
    const mapRef = useRef<L.Map | null>(null);
    const layerControlRef = useRef<L.Control.Layers | null>(null);
    const timeseriesLGroup = useRef<L.LayerGroup | null>(null);
    const {countyName, countyId, startDate, endDate, projects} = useContext(FilterContext);
    const queryClient = useQueryClient()
    const [openPopup, setOpenPopup] = useState<boolean>(false)
    const [selectedProject, setSelectedProject] = useState<number>()


    const {data} = useProjectLocationsQuery(countyName)

    function getRandomInt(max: number) {
        return Math.floor(Math.random() * max);
    }

    useEffect(() => {
        if (typeof window !== 'undefined' && mapContainer.current && !mapRef.current) {
            mapRef.current = L.map(mapContainer.current).setView([0, 37], 5);

            const osm = L.tileLayer(MAP_TILE.url);
            const imagery = L.tileLayer(ESRI_IMAGERY.url);
            const openTopoMap = L.tileLayer(
                "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
                {
                    maxZoom: 19,
                    attribution:
                        "Map data: © OpenStreetMap contributors, SRTM | Map style: © OpenTopoMap (CC-BY-SA)",
                }
            );

            const baseMaps = {
                OpenStreetMap: osm,
                "OpenStreetMap.HOT": imagery,
                "OpenTopo Map": openTopoMap,
            };

            osm.addTo(mapRef.current);
            layerControlRef.current = L.control.layers(baseMaps);
            layerControlRef.current.addTo(mapRef.current);
            timeseriesLGroup.current = L.layerGroup().addTo(mapRef.current);

            return () => {
                if (mapRef.current) {
                    mapRef.current.remove();
                    mapRef.current = null;
                }
            };
        }
    }, []);

    useEffect(() => { // Add and filter sub counties and projects layer
        console.log(`Selected county changed ${countyName}`);
        if (mapContainer.current && mapRef.current && countyName) {
            const cql_filter = "CQL_FILTER: county='{0}'"
            console.log("Updating WMS url date to " + countyName); //CQL_FILTER: county='Wajir'
            // const wms_url = `${GEOSERVER_BASE_URL}/flloca/wms?CQL_FILTER=county=${countyName}`
            const wms_url = `${GEOSERVER_BASE_URL}/flloca/wms`
            const projects_wms = countyName ? `${GEOSERVER_BASE_URL}/flloca/wms?CQL_FILTER=county=${countyName}` : `${GEOSERVER_BASE_URL}/timeseries/wms`
            const timeseries = L.tileLayer.wms(
                wms_url,
                {
                    layers: `flloca:ke_subcounty`,
                    format: "image/png",
                    transparent: true,
                    styles:'subcounty_bycounty'
                }
            );
            timeseriesLGroup.current?.clearLayers();
            timeseriesLGroup.current = L.layerGroup([timeseries]);
            //timeSeriesLayerGroup.clearLayers()
            timeseriesLGroup.current.addTo(mapRef.current);
            layerControlRef.current?.addOverlay(timeseriesLGroup.current, 'Sub Counties');
        }
    }, [countyName]);


    const onEachProjectClick = (projectFeature: GeoJSON.Feature, layer: L.Layer) => {
        setSelectedProject(getRandomInt(500))
        console.log(`${projectFeature} clicked`)
        layer.on({
            click: (event: any) => {
                event.target.setStyle({
                    color: "green",
                    fillColor: "yellow"
                });


            }
        })
        setOpenPopup(true);
        console.log(`Opening popup  ${openPopup}`)
        // if (
        //     projectFeature.properties &&
        //     Object.keys(projectFeature.properties).length > 0
        // ) {
        // const popupOptions = {
        //     minWidth: 100,
        //     maxWidth: 250,
        //     className: "popup-classname"
        // };
        // console.log('Opening popup')
        // layer.bindPopup(() => {
        //     const div = document.createElement("div");
        //     const root = createRoot(div);
        //     flushSync(() => {
        //         root.render(
        //             <FeaturePopup featureId={getRandomInt(500)}/>)
        //     });
        //     return div.innerHTML;
        // }, popupOptions);
        // }
    }
    var geojsonMarkerOptions = {
        radius: 8,
        fillColor: "#ff7800",
        color: "#000",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
    };
    const addGeoJsonLayer = (
        geojson_data: GeoJSON.FeatureCollection,
        layerGroup: L.LayerGroup
    ) => {
        if (isValidGeoJsonObject(geojson_data)) {
            const geoJsonLayer = L.geoJSON(geojson_data, {
                onEachFeature: (feature: GeoJSON.Feature, layer: L.Layer) => onEachProjectClick(feature, layer),
                pointToLayer: (feature, latlng) =>
                    L.circleMarker(latlng, geojsonMarkerOptions),
            });
            layerGroup.addLayer(geoJsonLayer);
        }
    };

    useEffect(() => {
        if (mapRef.current && data) {
            mapRef.current.eachLayer((layer) => {
                if (
                    layer instanceof L.GeoJSON
                    // layer instanceof L.MarkerClusterGroup
                ) {
                    mapRef.current?.removeLayer(layer);
                }
            });

            const markerClusterGroup = L.featureGroup()
            addGeoJsonLayer(data, markerClusterGroup);


            mapRef.current.addLayer(markerClusterGroup);

            const bounds = markerClusterGroup.getBounds();
            if (bounds.isValid()) {
                mapRef.current.fitBounds(bounds);
            } else {
                console.error("Invalid bounds, unable to fit the map to the data.");
            }
        }
    }, [data]);

    return (
        <main>
            <div ref={mapContainer} style={mapStyles}/>
            {/*<TimeSeriesSlider onChangeCommit={handleSliderChangeCommitted} />*/}
            {selectedProject && <InfoDrawer featureId={selectedProject} open={openPopup}/>}
        </main>
    );
}

export default ProjectMap;