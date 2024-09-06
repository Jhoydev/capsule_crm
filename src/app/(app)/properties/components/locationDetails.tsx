import React from 'react';
import { RiPriceTag2Line } from "react-icons/ri";
import { IoPricetagOutline } from "react-icons/io5";
import {Property} from "@/types/property.types";
import { FaRoad } from 'react-icons/fa';

interface PropertyDetailsProps {
    data: Property;
}

const LocationDetails: React.FC<PropertyDetailsProps> = ({ data }) => {

    const array = [data.street, data.street_number, data.door, data.floor, data.city];
    const arrayDirection = array.filter(item => item != null && item !== '');
    const direction = arrayDirection.join(",");

    return (
        <div className="bg-white rounded shadow p-5 w-1/2 mr-3">
            <h3 className="text-lg font-bold mb-5">Address</h3>
            <div className="flex  flex-col pb-5">
                <div className="flex flex-col mb-3">
                    <span className="mb-2 flex items-center">
                        <FaRoad className="mr-1" /> Street:
                    </span>
                    <span className="font-bold text-sm mt-2">{direction ?? "-"}</span>
                </div>


                <div className="flex flex-col mb-3">
                    <span className="mb-2 flex items-center">
                        <RiPriceTag2Line className="mr-1" />State:
                    </span>
                    <span className="font-bold text-sm mt-2">{data.state ?? "-"}</span>
                </div>

                <div className="flex flex-col mb-3">
                    <span className="mb-2 flex items-center">
                        <RiPriceTag2Line className="mr-1" />Country ID:
                    </span>
                    <span className="font-bold text-sm mt-2">{data.country_id ?? "-"}</span>
                </div>

                <div className="flex flex-col mb-3">
                    <span className="mb-2 flex items-center">
                        <RiPriceTag2Line className="mr-1" />Zip Code:
                    </span>
                    <span className="font-bold text-sm mt-2">{data.zip_code ?? "-"}</span>
                </div>

                <div className="flex flex-col">
                    <span className="mb-2 flex items-center">
                        <RiPriceTag2Line className="mr-1" />Zone:
                    </span>
                    <span className="font-bold text-sm mt-2">{data.zone ?? "-"}</span>
                </div>
            </div>
        </div>
    );
}

export default LocationDetails;
