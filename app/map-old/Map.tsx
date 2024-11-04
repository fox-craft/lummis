'use client'
import React, {useEffect, useState} from 'react'
import {MapContainer, TileLayer, ZoomControl} from 'react-leaflet'
import "leaflet/dist/leaflet.css"
import Layers from "@/app/map-old/Layers";


const Map = () => {
    const [map, setMap] = useState<L.Map>()
    const MAP_CENTER = [-0.9109, 34.211]

    useEffect(() => {
        if (map) {
            map.on('click', (e) => {
                map.setZoom(8);
            });
        }
    }, [map]);

    return (
        <>
            <MapContainer
                center={[-0.5109, 37.211]}
                zoom={7}
                style={{ height: '90vh', width: '100%' }}
                zoomControl ={false}
                whenReady={() => setMap}
            >
                <ZoomControl position='topleft'/>
                <Layers/>
            </MapContainer>
        </>
    )
}

export default Map