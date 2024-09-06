'use client'

import React from 'react';
import { MapContainer, Marker, Popup, TileLayer, CircleMarker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Link from 'next/link';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';


// Crear un icono personalizado
const customIcon = new L.Icon({
    iconUrl: icon.src,
    shadowUrl: iconShadow.src,
    iconSize: [25, 41], // tamaño del icono
    iconAnchor: [12, 41], // punto de anclaje, en relación al icono
    popupAnchor: [1, -34], // punto de anclaje del popup, en relación al icono
    shadowSize: [41, 41] // tamaño de la sombra
});

function MapDetails() {
    return (
        <div className="bg-gray-100 p-4 text-left w-3/4 m-2">
            <div className="w-full h-96">
                <MapContainer
                    center={[38.27231832871174, -0.7121807064845603]}
                    zoom={15}
                    scrollWheelZoom={false}
                    className="h-full w-full"
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                    />
                    <Marker position={[38.27231832871174, -0.7121807064845603]} icon={customIcon}>
                        <Popup>
                            A pretty CSS3 popup. <br /> Easily customizable.
                        </Popup>
                    </Marker>
                    {/*<CircleMarker center={[38.27231832871174, -0.7121807064845603]} radius={10} color="transparent" fillColor="green" opacity={5}>*/}
                    {/*    <Popup>*/}
                    {/*        <h2>Hola</h2>*/}
                    {/*        <Link href='https://inmovilla.com'>Click</Link>*/}
                    {/*    </Popup>*/}
                    {/*</CircleMarker>*/}
                </MapContainer>
            </div>
        </div>
    );
}

export default MapDetails;
