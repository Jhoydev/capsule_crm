import React from 'react';
import {Property} from "@/types/property.types";
import {IoBedOutline, IoPricetagOutline} from 'react-icons/io5';
import {BiSolidCarGarage} from "react-icons/bi";
import { PiBathtubLight, PiPolygonDuotone } from 'react-icons/pi';
import { MdBalcony } from 'react-icons/md';
import {RiMoneyEuroCircleLine, RiPriceTag2Line} from "react-icons/ri";
import LocationDetails from "@/app/(app)/properties/components/locationDetails";

interface PropertyDetailsProps {
    property: Property;
}

const PropertyDetails: React.FC<PropertyDetailsProps> = ({ property }) => {

    const price = property.sale_price != 0 ? property.sale_price + '€' : (property.rent_price != 0 ? property.rent_price + '€/month' : '');

    return (
        <div className="flex flex-col md:col-span-2">
            <div className="flex w-full justify-between mt-5 mb-3">
                <span className="text-2xl font-bold">{property.reference}</span>
                <span className="flex items-center text-xl font-bold"><RiMoneyEuroCircleLine
                    className="mr-1"/>{price}</span>
            </div>
            <LocationDetails data={property}/>
            <div className="flex mt-4 mb-4 text-sm text-slate-500">
                <div className="flex items-center mr-4">
                    <IoBedOutline className="ml-2 mr-1 text-green-500"/>
                    <span>{property.bedrooms} Beds</span>
                </div>
                <div className="flex items-center mr-4">
                    <PiBathtubLight className="ml-2 mr-1 text-green-500"/>
                    <span>{property.bathrooms} Baths</span>
                </div>
                <div className="flex items-center mr-4">
                    <BiSolidCarGarage className="ml-2 mr-1 text-green-500"/>
                    <span>{property.garage_spaces} Parks</span>
                </div>
            </div>
            <span className="border border-b-0 mb-6"></span>
            <div className="mb-4">
                <h2 className="text-lg font-bold">{property.title}</h2>
                <p className="text-sm mt-2">{property.description}</p>
            </div>
            <span className="border border-b-0 mb-6"></span>
            <div className="flex flex-wrap ml-5 justify-between items-end">
                <div className="flex flex-col mr-4 mb-5">
                    <span className="mb-2 flex items-center text-slate-500">
                        <RiPriceTag2Line className="mr-1 font-bold"/>Operation:
                    </span>
                    <span className="font-bold">{property.operation ?? "-"}</span>
                </div>
                <div className="flex flex-col mr-4 mb-5">
                    <span className="mb-2 flex items-center text-slate-500">
                        <IoPricetagOutline className="mr-1 font-bold"/> Sale price:
                    </span>
                    <span className="font-bold">{property.sale_price ?? "-"}</span>
                </div>
                <div className="flex flex-col mr-4 mb-5">
                    <span className="mb-2 flex items-center text-slate-500">
                        <IoPricetagOutline className="mr-1 font-bold"/>Rent price:
                    </span>
                    <span className="font-bold">{property.rent_price ?? "-"}</span>
                </div>
                <div className="flex flex-col mr-4 mb-5">
                    <span className="mb-2 flex items-center text-slate-500">
                        <IoPricetagOutline className="mr-1 font-bold"/>Transfer price:
                    </span>
                    <span className="font-bold">{property.transfer_price ?? "-"}</span>
                </div>
                <div className="flex flex-col mr-4 mb-5">
                    <span className="mb-2 flex items-center text-slate-500">
                        <PiPolygonDuotone className="mr-1 font-bold"/>Plot area:
                    </span>
                    <span className="font-bold">{property.plot_area ?? "-"}</span>
                </div>
                <div className="flex flex-col mr-4 mb-5">
                    <span className="mb-2 flex items-center text-slate-500">
                        <PiPolygonDuotone className="mr-1 font-bold"/>Usable area:
                    </span>
                    <span className="font-bold">{property.usable_area ?? "-"}</span>
                </div>
                <div className="flex flex-col mr-4 mb-5">
                    <span className="mb-2 flex items-center text-slate-500">
                        <MdBalcony className="mr-1 font-bold"/>Terrace area:
                    </span>
                    <span className="font-bold">{property.terrace_area ?? "-"}</span>
                </div>
            </div>
        </div>
    );
}

export default PropertyDetails;
