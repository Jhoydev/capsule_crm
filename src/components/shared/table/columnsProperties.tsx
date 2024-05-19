"use client"

import { ColumnDef } from "@tanstack/react-table"
import {Property} from "./property";

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
            }

            return (
                <div className="text-right font-medium">
                    <img src={foto} alt="img" className="w-36 h-24 rounded-lg object-cover"/>
                </div>
            );
        },
    },
    {
        accessorKey: "ref",
        header: "Referencia",
    },
    {
        accessorKey: "titulo",
        header: "Titulo",
    },
    {
        accessorKey: "calidades",
        header: "Calidades",
    },
]