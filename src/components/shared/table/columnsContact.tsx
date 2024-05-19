"use client"

import { ColumnDef } from "@tanstack/react-table"
import {Contact} from "./contact";

export const columns: ColumnDef<Contact>[] = [
    {
        accessorKey: "id",
        header: "",
        cell: ({ row }) => {
            return (
                <div className="text-right font-medium">
                    <img src="/images/avatar.jpg" alt="Avatar del Cliente" className="w-10 h-10 rounded-full object-cover"/>
                </div>
            );
        },
    },
    {
        accessorKey: "id",
        header: "Referencia",
    },
    {
        accessorKey: "nombre",
        header: "Nombre",
    },
    {
        accessorKey: "telefono",
        header: "Telefono",
    },
    {
        accessorKey: "email",
        header: "Email",
    },
]