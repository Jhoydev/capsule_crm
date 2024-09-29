"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import { Contact } from "../data/schema"
import { DataTableColumnHeader } from "./../data-table-column-header"
import { DataTableRowActions } from "./../data-table-row-actions"
import { propertyTableType } from '@/app/(app)/properties/components/properties-table/properties-table';
import { IoBed } from 'react-icons/io5';
import { PiBathtubBold, PiToiletLight } from 'react-icons/pi';

export const propertiesColumns: ColumnDef<propertyTableType>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
                className="translate-y-[2px]"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
                className="translate-y-[2px]"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "id",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="ID" />
        ),
        cell: ({ row }) => <div className="w-[80px]">{row.getValue("id")}</div>,
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "avatar",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="" />
        ),
        cell: ({ row }) => {
            return (
                <span className="relative flex shrink-0 overflow-hidden h-20 w-20">
                    <img className="h-full w-full" alt="Avatar" src={row.original.photo}/>
                </span>
            )
        },
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "reference",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Reference" />
        ),
        cell: ({ row }) => <div className="w-[80px]">{row.getValue("reference")}</div>,
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "type",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Type" />
        ),
        cell: ({ row }) => <div className="w-[80px] capitalize">{row.getValue<string>("type").replace('_', ' ') }</div>,
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "title",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Title" />
        ),
        cell: ({ row }) => {
            return (
                <div className="flex space-x-2">
                    <span className="max-w-[500px] truncate font-medium">
                        {row.getValue("title")}
                    </span>
                </div>
            )
        },
        enableSorting: false,
    },
    {
        accessorKey: "features",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="features" />
        ),
        cell: ({ row }) => {
            const bedrooms = Number(row.original.bedrooms) > 0 ? (
                <div className='flex items-center ml-2'>{row.original.bedrooms}<IoBed className='ml-1.5' /></div>
            ) : '';
            const bathrooms = Number(row.original.bathrooms) > 0 ? (
                <div className='flex items-center ml-2'>{row.original.bathrooms}<PiBathtubBold  className='ml-1.5' /></div>
            ) : '';
            const toilets = Number(row.original.toilets) > 0 ? (
                <div className='flex items-center ml-2'>{row.original.toilets}<PiToiletLight className='ml-1.5' /></div>
            ) : '';

            return (
                <div className="flex text-right font-medium">
                    {bedrooms}
                    {bathrooms}
                    {toilets}
                </div>
            );
        },
        enableSorting: false,
        filterFn: (row, email, value) => {
            return value.includes(row.getValue(email))
        },
    },
    {
        id: "actions",
        cell: ({ row }) => <DataTableRowActions row={row} />,
    },
]
