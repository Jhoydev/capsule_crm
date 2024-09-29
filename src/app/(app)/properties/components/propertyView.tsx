'use client'

import React from "react";
import Breadcrumbs from "@/components/shared/breadCrumbs";
import { FaEdit } from "react-icons/fa";
import { Property } from "@/types/property.types";
import TabProperty from "@/app/(app)/properties/components/tab";
import AgentDetails from "@/app/(app)/properties/components/agentDetails";
import GallerySwiper from "@/app/(app)/properties/components/gallerySwiper";
import PropertyDetails from "@/app/(app)/properties/components/propertyDetails";
import LocationDetails from "@/app/(app)/properties/components/locationDetails";
import ClientPropertyDetails from "@/app/(app)/properties/components/clientPropertyDetails";
import dynamic from 'next/dynamic';
import {PiBathtubLight} from "react-icons/pi";
import {IoBedOutline} from "react-icons/io5";
import {BiSolidCarGarage} from "react-icons/bi";

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
        <div className="flex flex-col flex-1 w-full h-[calc(100vh-80px)] overflow-auto">
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
            <div className="grid grid-rows-2 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 gap-4 m-5 p-5 grid-rows-[auto,200px]">
                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-7 md:col-span-1 gap-4">
                    <div className="md:col-span-5 border p-5 shadow rounded-md">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div className="md:col-span-3">
                                <div className="h-[400px]">
                                    <GallerySwiper property={data}/>
                                </div>
                            </div>
                            <div className="md:flex flex-col justify-between md:col-span-1 hidden ">
                                <div className="relative w-full h-[190px] rounded-md">
                                    <img className="rounded-md w-full h-full object-cover" alt="Imagen"
                                         src="https://fotos15.inmovilla.com/554/22034174/4-3.jpg"/>
                                    <div className="absolute inset-0 bg-gray-500 bg-opacity-50 rounded-md"></div>
                                </div>
                                <div className="relative w-full h-[190px] rounded-md">
                                    <img className="rounded-md w-full h-full object-cover" alt="Imagen"
                                         src="https://fotos15.inmovilla.com/554/22034174/4-4.jpg"/>
                                    <div className="absolute inset-0 bg-gray-500 bg-opacity-50 rounded-md"></div>
                                    <div className="absolute inset-0 flex items-center justify-center cursor-pointer">
                                        <span className="bg-white bg-opacity-70 text-gray-800 rounded-lg px-4 py-2 text-sm font-medium">
                                            +4 Photos
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <PropertyDetails property={data}/>
                        </div>
                    </div>
                    <div className="md:col-span-2 flex flex-col">
                        <AgentDetails/>
                        <MapDetails/>
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
