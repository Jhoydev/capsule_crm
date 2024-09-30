// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import {Property} from "@/types/property.types";
import React from "react";
import '../styles/mySwiper.css';
import GallerySwiper from "@/app/(app)/properties/components/gallerySwiper";

interface PropertyProps {
    property: Property
}

const GalleryPhotos: React.FC<PropertyProps> = ({ property }) => {

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-3">
                <div className="h-[400px]">
                    <GallerySwiper property={property}/>
                </div>
            </div>
            <div className="md:flex flex-col justify-between md:col-span-1 hidden">
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
                        <span
                            className="bg-white bg-opacity-70 text-gray-800 rounded-lg px-4 py-2 text-sm font-medium">
                            +4 Photos
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GalleryPhotos;



