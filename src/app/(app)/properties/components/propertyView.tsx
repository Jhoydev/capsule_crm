'use client'

import React from "react";
import Breadcrumbs from "@/components/shared/breadCrumbs";
import { FaEdit } from "react-icons/fa";
import { Property } from "@/types/property.types";
import TabProperty from "@/app/(app)/properties/components/tab";
import AgentDetails from "@/app/(app)/properties/components/agentDetails";
import GallerySwiper from "@/app/(app)/properties/components/gallerySwiper";

interface propertyViewProps {
    editFunction: (isEditing: boolean) => void;
    data: Property;
}

const propertyView: React.FC<propertyViewProps> = ({ editFunction, data }) => {
    const setIsEditing = (param: boolean) => {
        editFunction(param);
    }


    return (
        <div className="flex flex-col flex-1 w-full h-full">
            <div className="flex justify-between items-center mb-5 p-4">
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
            <div className="grid grid-rows-2 sm:grid-cols-1 md:grid-cols-4 flex-grow overflow-hidden">
                <div className="row-span-2 col-span-1">
                    <div className='h-[350px] justify-center items-center'>
                        <div className='flex w-full h-full p-5'>
                           <GallerySwiper property={data}/>
                        </div>
                    </div>
                    <div className="border-solid border-t hidden md:flex flex-col items-center p-10">
                        <AgentDetails/>
                    </div>
                </div>
                <div className="row-span-2 col-span-3 border bg-muted/40">
                    <TabProperty property={data}/>
                </div>
            </div>

        </div>
    );
}

export default propertyView;
