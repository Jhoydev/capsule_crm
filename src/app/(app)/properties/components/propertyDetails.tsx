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
        <div className="property-details md:col-span-2">
            <h2 className="text-xl font-bold">{data.title}</h2>
            <p className="text-lg text-green-500">{data.reference}</p>
            <div className="info-block flex mb-4 text text-slate-500">
                <div className="flex items-center mr-4"><span>{data.bathrooms}</span><PiBathtubLight className="ml-2 mr-1"/>Baths</div>
                <div className="flex items-center mr-4"><span>{data.bedrooms}</span><IoBedOutline className="ml-2 mr-1"/>Beds</div>
                <div className="flex items-center mr-4"><span>{data.garage_spaces}</span><BiSolidCarGarage className="ml-2 mr-1"/>Parks</div>
            </div>
            <div className="property-info flex flex-col mt-4">
                <div className="investment-stats flex flex-col mb-4">
                    <h3 className="text-lg font-bold mb-4">Prices</h3>
                    <div className="flex justify-between">
                        <div className="flex flex-col"><span
                            className="mb-2 flex items-center"><RiPriceTag2Line className="mr-1" />Operation:</span><span>{data.operation}</span></div>
                        <div className="flex flex-col"><span
                            className="mb-2 flex items-center"><IoPricetagOutline className="mr-1" /> Sale price:</span><span>{data.sale_price}</span></div>
                        <div className="flex flex-col"><span
                            className="mb-2 flex items-center"><IoPricetagOutline className="mr-1" />Rent price:</span><span>{data.rent_price}</span></div>
                        <div className="flex flex-col"><span
                            className="mb-2 flex items-center"><IoPricetagOutline className="mr-1" />Transfer price:</span><span>{data.transfer_price}</span></div>
                        <div className="flex flex-col"><span
                            className="mb-2 flex items-center"><PiPolygonDuotone className="mr-1" />Plot area:</span><span>{data.plot_area}</span></div>
                        <div className="flex flex-col"><span
                            className="mb-2 flex items-center"><PiPolygonDuotone className="mr-1" />Usable area:</span><span>{data.usable_area}</span></div>
                        <div className="flex flex-col"><span
                            className="mb-2 flex items-center"><MdBalcony className="mr-1" />Terrace area:</span><span>{data.terrace_area}</span></div>
                    </div>
                </div>
                <div className="investment-info">
                    <h3 className="text-lg font-bold">Description</h3>
                    <p className="text-sm mt-2">{data.description}</p>
                </div>
            </div>
        </div>
    );
}

export default PropertyDetails;
