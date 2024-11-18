"use client";
import React, {useContext, useEffect, useRef, useState} from "react";
import * as L from "leaflet";
import "leaflet-providers";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import "leaflet.markercluster";
import {MapContext} from "@/app/components/filter/MapContext";
import {useQueryClient} from "@tanstack/react-query";
import {useConservanciesQuery, useParkAndReservesQuery,} from "@/app/components/helpers/api";
import {isValidGeoJsonObject} from "@/app/components/helpers/utils";
import {createRoot} from "react-dom/client";
import {flushSync} from "react-dom";
import FeaturePopup from "@/app/components/map/FeaturePopup";
import InfoDrawer from "@/app/components/map/InfoDrawer";
import {Feature, GeoJsonProperties} from "geojson";
import {Popover, useMediaQuery} from "@mui/material";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import {useTheme} from "@mui/material/styles";
import SwapeableTopDrawer from "@/app/components/map/SwapeableTopDrawer";


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

const conservanciesStyle = {
    fillColor: '#F09319',
    fillOpacity: 0.5,
    weight: 2,
    opacity: 1,
    color: '#ffffff',
    dashArray: '3'
}
const parksStyle = {
    fillColor: '#3D5300',
    fillOpacity: 0.5,
    weight: 2,
    opacity: 1,
    color: '#ffffff',
    dashArray: '3'
}
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
    const timeseriesLGroup = useRef<L.LayerGroup | null>(null);
    const selectionRef = useRef<any>(null)
    const {landscape, selectedFeature, setSelectedFeature, setDetailedPopupOpen, county} = useContext(MapContext);
    const queryClient = useQueryClient()
    const [openPopup, setOpenPopup] = useState<boolean>(false)
    const theme = useTheme()

    const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
    const [infoOpen, setInfoOpen] = useState<boolean>(!isMobile)

    const {data: parks} = useParkAndReservesQuery()
    const {data: conservancies} = useConservanciesQuery()

    const togglePopup = () => {
        console.log(`Info Window is open ${infoOpen}`)
        if (infoOpen) {
            setInfoOpen(!infoOpen)
            console.log(`Info Window is now open ${infoOpen}`)
        }
        setDetailedPopupOpen(true)
        console.log(`Popup Window is ${infoOpen}`)
    }

    useEffect(() => {
        if (typeof window !== 'undefined' && mapContainer.current && !mapRef.current) {

            mapRef.current = L.map(mapContainer.current).setView([0, 37], 5);

            const osm = L.tileLayer.provider('OpenStreetMap');
            const openTopoMap = L.tileLayer.provider('OpenTopoMap');
            const Stadia_StamenWatercolor = L.tileLayer.provider('Stadia.StamenWatercolor');
            const Stadia_AlidadeSmooth = L.tileLayer.provider('Stadia.AlidadeSmooth');
            // const Stadia_AlidadeSatellite = L.tileLayer.provider('Stadia.AlidadeSatellite');
            const Stadia_StamenToner = L.tileLayer.provider('Stadia.StamenToner');
            //TODO better basemaps https://github.com/clavijojuan/L.switchBasemap?tab=readme-ov-file
            const baseMaps = {
                "Stadia StamenWatercolor": Stadia_StamenWatercolor,
                "Stadia AlidadeSmooth": Stadia_AlidadeSmooth,
                // "Stadia AlidadeSatellite": Stadia_AlidadeSatellite,
                "Stadia StamenToner": Stadia_StamenToner,
                "OpenStreetMap": osm,
                "OpenTopo Map": openTopoMap,
            };

            Stadia_AlidadeSmooth.addTo(mapRef.current);
            layerControlRef.current = L.control.layers(baseMaps);
            layerControlRef.current.setPosition('bottomleft')
            layerControlRef.current.addTo(mapRef.current,);
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
        console.log(`Selected county changed ${landscape}`);
        if (mapContainer.current && mapRef.current && landscape) {
            const cql_filter = "CQL_FILTER: county='{0}'"
            console.log("Updating WMS url date to " + landscape);
            const wms_url = `${GEOSERVER_BASE_URL}/flloca/wms`
            const projects_wms = landscape ? `${GEOSERVER_BASE_URL}/flloca/wms?CQL_FILTER=county=${landscape}` : `${GEOSERVER_BASE_URL}/timeseries/wms`
            const timeseries = L.tileLayer.wms(
                wms_url,
                {
                    layers: `flloca:ke_subcounty`,
                    format: "image/png",
                    transparent: true,
                    styles: 'subcounty_bycounty'
                }
            );
            timeseriesLGroup.current?.clearLayers();
            timeseriesLGroup.current = L.layerGroup([timeseries]);
            //timeSeriesLayerGroup.clearLayers()
            timeseriesLGroup.current.addTo(mapRef.current);
            layerControlRef.current?.addOverlay(timeseriesLGroup.current, 'Sub Counties');
        }
    }, [landscape]);

    const zoomToFeature = (feature: Feature) => (e: any) => {
        console.log('Toggling popup states')
        togglePopup()
        mapRef.current?.fitBounds(e.target.getBounds());
    }
    const onFeatureClick = (clickedFeature: Feature, layer: any) => {
        layer.on({
            'mouseover': function (e: any) {

            },
            "click": function (e: any) {
                // if (selection) {
                //     resetstyles()
                // }

                // e.target.setStyle(selectedStyle)
                selectionRef.current = e.target
                togglePopup()
                setSelectedFeature(clickedFeature)
                L.DomEvent.stopPropagation(e)

                if (
                    clickedFeature.properties &&
                    Object.keys(clickedFeature.properties).length > 0
                ) {
                    const popupOptions = {
                        minWidth: 100,
                        maxWidth: 250,
                        className: "popup-classname"
                    };
                    layer.bindPopup(() => {
                        const div = document.createElement("div");
                        const root = createRoot(div);
                        flushSync(() => {
                            root.render(
                                <FeaturePopup feature={clickedFeature}/>)
                        });
                        return div.innerHTML;
                    }, popupOptions);
                }
            },
            // "mouseout": resetHighlight,
        });

    }

    const Tooltip = (event: any) => {
        const [anchorEl, setAnchorEl] = React.useState(event);

        const handleClose = () => {
            setAnchorEl(null);
        };
        const open = Boolean(anchorEl);
        const id = open ? 'simple-popover' : undefined;
        return (
            <>
                <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                >
                    <Typography sx={{p: 2}}>The content of the Popover.</Typography>
                </Popover>
            </>
        )
    }

    const highlightFeature = (e: any) => {
        var layer = e.target;

        // layer.setStyle({
        //     weight: 5,
        //     color: '#666',
        //     dashArray: '',
        //     fillOpacity: 0.7
        // });

        layer.bringToFront();

    }


    // const resetHighlight= (l: GeoJSON.Feature, e: any)=> {
    //     l.resetStyle(e.target);
    // }
    const getColor = (property: String) => {
        return property == 'National Park' ? '#347928' :
            property == 'National Reserve' ? '#C0EBA6' :
                property == 'Marine National Park' ? '#FFFBE6' :
                    property == 'Marine National Reserve' ? '#FCCD2A' :
                        property == 'National Sanctuary' ? '#3D5300' :
                            '#CA7373';
    }

    const onStyle = (feature: GeoJsonProperties) => {
        // @ts-ignore
        var designation = feature.properties.DESIG
        return {
            fillColor: getColor(designation),
            weight: 2,
            opacity: 1,
            color: 'white',
            dashArray: '3',
            fillOpacity: 0.7
        }
    }
    useEffect(() => {
        // if (mapRef.current && data) {
        //     mapRef.current.eachLayer((layer) => {
        //         if (
        //             layer instanceof L.GeoJSON
        //
        //             // layer instanceof L.MarkerClusterGroup
        //         ) {
        //             mapRef.current?.removeLayer(layer);
        //         }
        //     });
        //
        //     const markerClusterGroup = L.featureGroup()
        //     addGeoJsonLayer(data, markerClusterGroup);
        //
        //
        //     mapRef.current.addLayer(markerClusterGroup);
        //
        //     const bounds = markerClusterGroup.getBounds();
        //     if (bounds.isValid()) {
        //         mapRef.current.fitBounds(bounds);
        //     } else {
        //         console.error("Invalid bounds, unable to fit the map to the data.");
        //     }
        // }

        if (mapRef.current && parks) {

            console.log(parks)
            const layerGroup = L.featureGroup()
            if (isValidGeoJsonObject(parks)) {
                // @ts-ignore
                const geoJsonLayer = L.geoJSON(parks, {
                    //style: (feature) => onStyle(feature.properties),
                    style: parksStyle,
                    onEachFeature: (feature: Feature, layer: L.Layer) => onFeatureClick(feature, layer),
                })
                layerGroup.addLayer(geoJsonLayer);
            }


            mapRef.current.addLayer(layerGroup);
            layerControlRef.current?.addOverlay(layerGroup, "Parks & Reserves").addTo(mapRef.current);
            const bounds = layerGroup.getBounds();
            if (bounds.isValid()) {
                mapRef.current.fitBounds(bounds);
            } else {
                console.error("Invalid bounds, unable to fit the map to the data.");
            }
        }
    }, [parks]);
    const filterGeojson = (county: string, feature: Feature) => {
        return feature && feature.properties ? feature.properties['COUNTY'] === county : false
    }

    useEffect(() => {
        if (mapRef.current) {
            var layerGroup = L.featureGroup()
            var  geoJsonLayer = L.geoJSON();
            if (conservancies && county) {
                console.log(`County is selected ${county}`);
                // Define a filter function to include only features with a specific property
                //const filterByType = (feature: Feature) => feature.properties.county === county;

                // Create the filtered GeoJSON layer

                if (isValidGeoJsonObject(conservancies)) {
                    geoJsonLayer = L.geoJSON(conservancies, {
                        filter: (feature: Feature) => filterGeojson(county, feature),
                        onEachFeature: (feature: Feature, layer: L.Layer) => onFeatureClick(feature, layer)
                    });
                }
            } else if (conservancies) {

                if (isValidGeoJsonObject(conservancies)) {
                    geoJsonLayer = L.geoJSON(conservancies, {
                        style: conservanciesStyle,
                        onEachFeature: (feature: Feature, layer: L.Layer) => onFeatureClick(feature, layer),
                    })

                }
            }
            layerGroup.addLayer(geoJsonLayer);
            mapRef.current.addLayer(layerGroup);
            layerControlRef.current?.addOverlay(layerGroup, "Conservancies").addTo(mapRef.current);
            const bounds = layerGroup.getBounds();
            if (bounds.isValid()) {
                mapRef.current.fitBounds(bounds);
            } else {
                console.error("Invalid bounds, unable to fit the map to the data.");
            }

        }

    }, [conservancies, county]);

    return (
        <main>
            <IconButton
                style={{position: 'fixed', right: 16, top: 16, zIndex: 1000}}
                onClick={() => setInfoOpen(!infoOpen)}
            >
                <InfoIcon/>
            </IconButton>
            <div ref={mapContainer} style={mapStyles}/>
            {infoOpen && (<InfoDrawer open={infoOpen}/>)}
            <SwapeableTopDrawer/>
            {/*{selectedFeature && (<PopupDrawer/>)}*/}
        </main>
    );
}

export default ProjectMap;