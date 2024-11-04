import React, {SyntheticEvent, useState} from 'react'
import {TileLayer, LayersControl, LayerGroup, GeoJSON, Tooltip, WMSTileLayer} from 'react-leaflet'
import {createRoot} from "react-dom/client";
import {flushSync} from "react-dom";
import InfoDrawer from "@/app/components/map/InfoDrawer";
import FeaturePopup from "@/app/components/map/FeaturePopup";
import farms from "@/public/data/farms.json"
import {FeatureCollection, GeoJsonProperties, Geometry} from "geojson";


const mapLink = '<a href="http://www.esri.com/">Esri</a>';
const wholink = 'i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community';
const ESRI_IMAGERY = {
    "url": 'http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    "attribution": '&copy; ' + {mapLink} + ', ' + {wholink},
    "maxZoom": 18,
}

const Layers = () => {
    const [farmProperties, setFarmProperties] = useState(null);
    const [openInfoWindow, setOpenInfoWindow] = useState(false)
    const farmsStyle = {
        fillColor: "blue",
        fillOpacity: 0.1,
        color: "black",
        weight: 1
    }

    const data : any = farms

    const onEachFarmClick = (farm: any, layer: any) => {
        layer.on({
            click: (event: any) => {
                event.target.setStyle({
                    color: "green",
                    fillColor: "yellow"
                });
                setFarmProperties(farm.properties)
                setOpenInfoWindow(true);
            }
        })

        const popupOptions = {
            minWidth: 100,
            maxWidth: 250,
            className: "popup-classname"
        };

        layer.bindPopup(() => {
            const div = document.createElement("div");
            const root = createRoot(div);
            flushSync(() => {
                root.render(<FeaturePopup feature={farm.properties}/>)
            });
            return div.innerHTML;
        }, popupOptions);
    }

    return (
        <>
            <LayersControl position="topleft">
                <LayersControl.BaseLayer checked name="OpenStreet Map">
                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                </LayersControl.BaseLayer>

                <LayersControl.BaseLayer name="Topo Map">
                    <TileLayer
                        attribution='Page data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Page style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
                        url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
                    />
                </LayersControl.BaseLayer>
                <LayersControl.BaseLayer name="ESRI Imagery">
                    <TileLayer
                        attribution={ESRI_IMAGERY.attribution}
                        url= {ESRI_IMAGERY.url}
                    />
                </LayersControl.BaseLayer>
                <LayersControl.Overlay checked name="Farms">
                    <LayerGroup>
                        <GeoJSON
                            key = {'farms'}
                            style={farmsStyle}
                            data={data}
                            onEachFeature={onEachFarmClick}
                        >
                           <Tooltip>
                               Some funny tooltip
                           </Tooltip>
                        </GeoJSON>
                    </LayerGroup>
                </LayersControl.Overlay>

                <LayersControl.Overlay name={'Zones'}>
                    <WMSTileLayer
                        url = 'http://localhost:8081/geoserver/kilimo/wms'
                        params ={{
                            format:"image/png",
                            layers:"kilimo:Zones",
                            transparent: true,
                        }}
                    />
                </LayersControl.Overlay>
                <LayersControl.Overlay name={'Sugar Factories'}>
                    <WMSTileLayer
                        url = 'http://localhost:8081/geoserver/kilimo/wms'
                        params ={{
                            format:"image/png",
                            layers:"kilimo:Sugar_Factories",
                            transparent: true,
                        }}
                    />
                </LayersControl.Overlay>
            </LayersControl>
            <InfoDrawer feature={farmProperties} open={openInfoWindow}/>
        </>
    )
}

export default Layers