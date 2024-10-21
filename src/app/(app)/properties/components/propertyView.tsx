'use client'

import React from "react";
import Breadcrumbs from "@/components/shared/breadCrumbs";
import { FaEdit } from "react-icons/fa";
import { Property } from "@/types/property.types";
import TabProperty from "@/app/(app)/properties/components/tab";
import AgentDetails from "@/app/(app)/properties/components/agentDetails";
import PropertyDetails from "@/app/(app)/properties/components/propertyDetails";
import ClientPropertyDetails from "@/app/(app)/properties/components/clientPropertyDetails";
import dynamic from 'next/dynamic';
import GalleryPhotos from "@/app/(app)/properties/components/galleryPhotos";

//Esto es útil para componentes que dependen de objetos o propiedades disponibles solo en el navegador, como window o document, que no existen en el entorno de servidor.
//porl o que con la siguiente intruccion le decimos que cargue el componente mapa de forma dinamica y le indicamos con el ssr false que no lo haga en el lado del servidor.
const MapDetails = dynamic(() => import('./mapDetails'), {
    ssr: false
});

interface TabPropertyProps {
    property: Property
}

interface propertyViewProps {
    editFunction: (isEditing: boolean) => void;
    data: Property;
}

const propertyView: React.FC<propertyViewProps> = ({ editFunction, data }) => {
    const setIsEditing = (param: boolean) => {
        editFunction(param);
    }


    return (
        <div className="flex flex-col flex-1 w-full h-[calc(100vh-80px)]">
            <div className="flex justify-between items-center p-4">
                <Breadcrumbs/>
                <div className="flex justify-end items-center">
                    <button
                        onClick={() => setIsEditing(true)}
                        className="bg-green-capsule hover:bg-green-600 text-white px-4 py-2 rounded-md shadow flex items-center"
                    >
                        <FaEdit className="mr-2"/> Edit
                    </button>
                </div>
            </div>
            <div className="grid grid-rows-2 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 gap-4 p-6 grid-rows-[auto,auto] overflow-auto">
                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-7 md:col-span-1 gap-4">
                    <div className="md:col-span-5 border p-5 shadow rounded-md">
                        <GalleryPhotos property={data}/>
                        <PropertyDetails property={data}/>
                    </div>
                    <div className="md:col-span-2 flex flex-col gap-2">
                        <AgentDetails/>
                        <MapDetails latitude={data.latitude} longitude={data.longitude} />
                        <TabProperty property={data}/>
                    </div>
                </div>
                <div className="border rounded shadow p-5 w-full mt-4">
                    <ClientPropertyDetails property={data}/>
                </div>
            </div>

        </div>
    );
}

export default propertyView;
