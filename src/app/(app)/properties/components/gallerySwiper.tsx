// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import {EffectFade, Navigation, Pagination} from "swiper/modules";
import {Property} from "@/types/property.types";
import React from "react";
import '../styles/mySwiper.css';

interface PropertyProps {
    property: Property
}


const GallerySwiper: React.FC<PropertyProps> = ({ property }) => {

    let datosFotos = new Array("https://fotos15.inmovilla.com/554/22034174/4-1.jpg",
                                            "https://fotos15.inmovilla.com/554/22034174/4-2.jpg",
                                            "https://fotos15.inmovilla.com/554/22034174/4-3.jpg",
                                            "https://fotos15.inmovilla.com/554/22034174/4-4.jpg");

    const pagination = {
        clickable: true,
        renderBullet: function (index: number, className: string) {
            return '<span class="' + className + '">' + (index + 1) + '</span>';
        },
    };

    return (
        <Swiper
            // install Swiper modules
            modules={[Navigation, Pagination, EffectFade]}
            spaceBetween={30}
            effect={'fade'}
            slidesPerView={1}
            navigation
            pagination={pagination}
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log('slide change')}
            className="mySwiper"
            style={{
                '--swiper-navigation-color': '#fff',
                '--swiper-pagination-color': '#fff',
            } as React.CSSProperties}
        >

            {datosFotos.map((foto, index) => (
                <SwiperSlide key={index}>
                    <img src={foto} alt={`Foto ${index + 1}`} />
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default GallerySwiper;

