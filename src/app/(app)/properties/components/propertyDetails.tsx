import React from 'react';
import {Property} from "@/types/property.types";
import {IoBedOutline, IoPricetagOutline} from 'react-icons/io5';
import {BiSolidCarGarage} from "react-icons/bi";
import { PiBathtubLight, PiPolygonDuotone } from 'react-icons/pi';
import { MdBalcony } from 'react-icons/md';
import {RiPriceTag2Line} from "react-icons/ri";

interface PropertyDetailsProps {
    data: Property;
}

const PropertyDetails: React.FC<PropertyDetailsProps> = ({ data }) => {
    return (
        <div className="flex flex-col md:col-span-2 mt-5">
            <h2 className="text-xl font-bold text-green-500">{data.reference}</h2>
            <div className="info-block flex mb-4 text text-slate-500 pb-5">
                <div className="flex items-center mr-4"><span>{data.bathrooms}</span><PiBathtubLight
                    className="ml-2 mr-1"/>Baths
                </div>
                <div className="flex items-center mr-4"><span>{data.bedrooms}</span><IoBedOutline
                    className="ml-2 mr-1"/>Beds
                </div>
                <div className="flex items-center mr-4"><span>{data.garage_spaces}</span><BiSolidCarGarage
                    className="ml-2 mr-1"/>Parks
                </div>
            </div>
            <div className="border-b-2 pb-5 mb-5">
                <h2 className="text-xl font-bold">{data.title}</h2>
                <p className="text-sm mt-2">{data.description}</p>
            </div>
            <div className="flex pb-5 justify-between border-b-1">
                <div className="flex flex-col">
                    <span className="mb-2 flex items-center">
                        <RiPriceTag2Line className="mr-1"/>Operation:
                    </span>
                    <span className="font-bold">{data.operation ?? "-"}</span>
                </div>
                <div className="flex flex-col">
                    <span className="mb-2 flex items-center">
                        <IoPricetagOutline className="mr-1"/> Sale price:
                    </span>
                    <span className="font-bold">{data.sale_price ?? "-"}</span>
                </div>
                <div className="flex flex-col">
                    <span className="mb-2 flex items-center">
                        <IoPricetagOutline className="mr-1"/>Rent price:
                    </span>
                    <span className="font-bold">{data.rent_price ?? "-"}</span>
                </div>
                <div className="flex flex-col">
                    <span className="mb-2 flex items-center">
                        <IoPricetagOutline className="mr-1"/>Transfer price:
                    </span>
                    <span className="font-bold">{data.transfer_price ?? "-"}</span>
                </div>
                <div className="flex flex-col">
                    <span className="mb-2 flex items-center">
                        <PiPolygonDuotone className="mr-1"/>Plot area:
                    </span>
                    <span className="font-bold">{data.plot_area ?? "-"}</span>
                </div>
                <div className="flex flex-col">
                    <span className="mb-2 flex items-center">
                        <PiPolygonDuotone className="mr-1"/>Usable area:
                    </span>
                    <span className="font-bold">{data.usable_area ?? "-"}</span>
                </div>
                <div className="flex flex-col">
                    <span className="mb-2 flex items-center">
                        <MdBalcony className="mr-1"/>Terrace area:
                    </span>
                    <span className="font-bold">{data.terrace_area ?? "-"}</span>
                </div>
            </div>
        </div>
    );
}

export default PropertyDetails;
