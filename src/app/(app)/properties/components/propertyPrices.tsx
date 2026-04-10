import React from 'react';
import {Property} from "@/types/property.types";
import {IoBedOutline, IoPricetagOutline} from 'react-icons/io5';
import { PiBathtubLight, PiPolygonDuotone } from 'react-icons/pi';
import { MdBalcony } from 'react-icons/md';
import {RiMoneyEuroCircleLine, RiPriceTag2Line} from "react-icons/ri";

interface PropertyDetailsProps {
    property: Property;
}

const PropertyPrices: React.FC<PropertyDetailsProps> = ({ property }) => {

    const price = property.sale_price != 0 ? property.sale_price + '€' : (property.rent_price != 0 ? property.rent_price + '€/month' : '');

    return (
        <div className="rounded-md border bg-card p-5 text-card-foreground shadow-sm md:col-span-5">
            <div className="flex flex-wrap ml-5 justify-between items-end">
                <div className="flex flex-col mr-4 mb-5">
                    <span className="mb-2 flex items-center text-muted-foreground">
                        <RiPriceTag2Line className="mr-1 font-bold"/>Operation:
                    </span>
                    <span className="font-bold">{property.operation ?? "-"}</span>
                </div>
                <div className="flex flex-col mr-4 mb-5">
                    <span className="mb-2 flex items-center text-muted-foreground">
                        <IoPricetagOutline className="mr-1 font-bold"/> Sale price:
                    </span>
                    <span className="font-bold">
                      {parseFloat(String(property.sale_price))?.toLocaleString('es-ES', {style: 'currency', currency: 'EUR'}) ?? "-"}
                    </span>
                </div>
                <div className="flex flex-col mr-4 mb-5">
                    <span className="mb-2 flex items-center text-muted-foreground">
                        <IoPricetagOutline className="mr-1 font-bold"/>Rent price:
                    </span>
                    <span className="font-bold">{parseFloat(String(property.rent_price))?.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })  ?? "-"}</span>
                </div>
                <div className="flex flex-col mr-4 mb-5">
                    <span className="mb-2 flex items-center text-muted-foreground">
                        <IoPricetagOutline className="mr-1 font-bold"/>Transfer price:
                    </span>
                    <span className="font-bold">{parseFloat(String(property.transfer_price))?.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })  ?? "-"}</span>
                </div>
                <div className="flex flex-col mr-4 mb-5">
                    <span className="mb-2 flex items-center text-muted-foreground">
                        <PiPolygonDuotone className="mr-1 font-bold"/>Plot area:
                    </span>
                    <span className="font-bold">{property.plot_area + ' m²' ?? "-"}</span>
                </div>
                <div className="flex flex-col mr-4 mb-5">
                    <span className="mb-2 flex items-center text-muted-foreground">
                        <PiPolygonDuotone className="mr-1 font-bold"/>Usable area:
                    </span>
                    <span className="font-bold">{property.usable_area + ' m²' ?? "-"}</span>
                </div>
                <div className="flex flex-col mr-4 mb-5">
                    <span className="mb-2 flex items-center text-muted-foreground">
                        <MdBalcony className="mr-1 font-bold"/>Terrace area:
                    </span>
                    <span className="font-bold">{property.terrace_area + ' m²' ?? "-"}</span>
                </div>
            </div>
        </div>
    );
}

export default PropertyPrices;
