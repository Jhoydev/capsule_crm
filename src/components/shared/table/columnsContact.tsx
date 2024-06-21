"use client"

import { ColumnDef } from "@tanstack/react-table"
import {Contact} from "@/types/contact.types";

export const columns: ColumnDef<Contact>[] = [
    {
        accessorKey: "avatar",
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
        accessorKey: "first_name",
        header: "Nombre",
        cell: ({ row }) => {
            const nombreCompleto = row.original.first_name + " " + row.original.last_name;

            return (
                <div>
                    {nombreCompleto}
                </div>
            );
        },
    },
    {
        accessorKey: "phone",
        header: "Telefono",
    },
    {
        accessorKey: "email",
        header: "Email",
    },
]