"use client"

import { ColumnDef } from "@tanstack/react-table"
import {Property} from "@/types/property.types";
import { PiToiletLight } from "react-icons/pi";
import { IoBed } from "react-icons/io5";
import { PiBathtubBold } from "react-icons/pi";

export const columns: ColumnDef<Property>[] = [
    {
        accessorKey: "id",
        header: "",
        cell: ({ row }) => {

            let foto = "";
            switch (row["original"]["id"]){
                case 1:
                    foto = "https://fotos15.inmovilla.com/413/11246413/24-1.jpg";
                    break;
                case 2:
                    foto = "https://fotos15.apinmo.com/413/11396550/2-1s.jpg";
                    break;
                case 3:
                    foto = "https://fotos15.apinmo.com/413/11769612/27-1s.jpg";
                    break;
                default:
                    foto = "https://fotos15.apinmo.com/413/11769612/27-1s.jpg";
                    break;
            }

            return (
                <div className="text-right font-medium">
                    <img src={foto} alt="img" className="w-36 h-24 rounded-lg object-cover"/>
                </div>
            );
        },
    },
    {
        accessorKey: "reference",
        header: "Referencia",
    },
    {
        accessorKey: "title",
        header: "Titulo",
    },
    {
        accessorKey: "calidades",
        header: "Calidades",
        cell: ({ row }) => {
            const habitaciones = row["original"]["bedrooms"] > 0 ? (
                <div className='flex items-center ml-2'>{row["original"]["bedrooms"]}<IoBed className='ml-1.5' /></div>
            ) : '';
            const bathrooms = row["original"]["bathrooms"] > 0 ? (
                <div className='flex items-center ml-2'>{row["original"]["bathrooms"]}<PiBathtubBold  className='ml-1.5' /></div>
            ) : '';
            const toilets = row["original"]["toilets"] > 0 ? (
                <div className='flex items-center ml-2'>{row["original"]["toilets"]}<PiToiletLight className='ml-1.5' /></div>
            ) : '';


            return (
                <div className="flex text-right font-medium">
                    {habitaciones}
                    {bathrooms}
                    {toilets}
                </div>
            );
        },
    },
]
