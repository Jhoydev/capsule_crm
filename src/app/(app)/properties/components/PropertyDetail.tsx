'use client'

import React from "react";
import Breadcrumbs from "@/components/shared/breadCrumbs";
import { Property } from "@/types/property.types";
import TabProperty from "@/app/(app)/properties/components/tab";
import AgentDetails from "@/app/(app)/properties/components/agentDetails";
import PropertyDetails from "@/app/(app)/properties/components/propertyDetails";
import ClientPropertyDetails from "@/app/(app)/properties/components/clientPropertyDetails";
import dynamic from 'next/dynamic';
import GalleryPhotos from "@/app/(app)/properties/components/galleryPhotos";
import PropertyPrices from "@/app/(app)/properties/components/propertyPrices";

// Cargar el mapa dinámicamente para evitar errores en SSR
const MapDetails = dynamic(() => import('./map/mapDetails'), {
    ssr: false
});

interface PropertyDetailProps {
    data: Property;
}

const PropertyDetail: React.FC<PropertyDetailProps> = ({ data }) => {
    return (
        <div className="flex flex-col flex-1 w-full h-[calc(100vh-80px)]">
            <div className="grid grid-rows-2 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 gap-4 grid-rows-[auto,auto] overflow-auto">
                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-7 md:col-span-1 gap-4">
                    <div className="md:col-span-5 border p-5 shadow rounded-md">
                        <GalleryPhotos property={data} />
                        <PropertyDetails property={data} />
                    </div>
                    <div className="md:col-span-2 flex flex-col gap-2">
                        <AgentDetails />
                        <MapDetails latitude={data.latitude} longitude={data.longitude} search="desactivate" />
                        <TabProperty property={data} />
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-7 md:col-span-1 w-full mt-4">
                    <PropertyPrices property={data} />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-7 md:col-span-1 w-full mt-4">
                    <ClientPropertyDetails property={data} />
                </div>
            </div>
        </div>
    );
}

export default PropertyDetail;
