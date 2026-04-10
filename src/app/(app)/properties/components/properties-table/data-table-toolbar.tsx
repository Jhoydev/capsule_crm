"use client"

import { Table } from "@tanstack/react-table"
import { Input } from "@/components/ui/input"
import { DataTableViewOptions } from '@/components/shared/data-table/data-table-view-options';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { IoBed } from "react-icons/io5";
import { PiBathtubBold, PiToiletLight } from "react-icons/pi";
import { Euro, Type } from 'lucide-react';

import {propertySchema} from "@/schemas/property.schema";

interface DataTableToolbarProps<TData> {
    table?: Table<TData>
}

export function DataTableToolbar<TData>({ table }: DataTableToolbarProps<TData>) {
    if (!table) {
        return null
    }

    const types: string[] = propertySchema.shape.type.options
    const status: string[] = propertySchema.shape.status.options;

    return (
        <div className="flex flex-col gap-3 xl:flex-row xl:items-start xl:justify-between">
            <div className="flex min-w-0 flex-1 flex-wrap items-start gap-3">
                <Select
                    onValueChange={(value) =>
                        table.getColumn("status")?.setFilterValue(value)
                    }
                >
                    <SelectTrigger className="w-full capitalize sm:w-[180px]">
                        <SelectValue placeholder="Select a status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Status</SelectLabel>
                            <SelectItem className="capitalize" value=" ">All</SelectItem>
                            {status?.map((item, index) => (
                                <SelectItem className="capitalize" value={item} key={index}>
                                    {item.replace('_', ' ')}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <div className="relative w-full sm:w-[220px]">
                    <Type
                        className="absolute left-2 h-4 w-4 text-muted-foreground"
                        style={{ top: '13px' }}
                    />
                    <Input
                        placeholder="Filter reference..."
                        value={(table.getColumn("reference")?.getFilterValue() as string) ?? ""}
                        onChange={(event) =>
                            table.getColumn("reference")?.setFilterValue(event.target.value)
                        }
                        className="w-full pl-8"
                    />
                </div>

                <Select
                    onValueChange={(value) =>
                        table.getColumn("type")?.setFilterValue(value)
                    }
                >
                    <SelectTrigger className="w-full capitalize sm:w-[180px]">
                        <SelectValue placeholder="Select a type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Types</SelectLabel>
                            <SelectItem className="capitalize" value=" ">All</SelectItem>
                            {types?.map((item, index) => (
                                <SelectItem className="capitalize" value={item} key={index}>
                                    {item.replace('_', ' ')}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <div className="relative w-full sm:w-[140px]">
                    <IoBed
                        className="absolute left-2 h-4 w-4 text-muted-foreground"
                        style={{ top: '13px' }}
                    />
                    <Input
                        placeholder="Bedrooms" className="w-full pl-8" type='number'
                        onChange={(event) =>
                            table.getColumn("bedrooms")?.setFilterValue(event.target.value)
                        }
                    />
                </div>
                <div className="relative w-full sm:w-[140px]">
                    <PiBathtubBold
                        className="absolute left-2 h-4 w-4 text-muted-foreground"
                        style={{ top: '13px' }}
                    />
                    <Input
                        placeholder="Bathrooms" className="w-full pl-8" type='number'
                        onChange={(event) =>
                            table.getColumn("bathrooms")?.setFilterValue(event.target.value)
                        }
                    />
                </div>
                <div className="relative w-full sm:w-[140px]">
                    <PiToiletLight
                        className="absolute left-2 h-4 w-4 text-muted-foreground"
                        style={{ top: '13px' }}
                    />
                    <Input
                        placeholder="Toilets" className="w-full pl-8" type='number'
                        onChange={(event) =>
                            table.getColumn("toilets")?.setFilterValue(event.target.value)
                        }
                    />
                </div>
                <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
                    <div className="relative w-full sm:w-[160px]">
                        <Euro
                            className="absolute left-2 h-4 w-4 text-muted-foreground"
                            style={{ top: '13px' }}
                        />
                        <Input
                            placeholder="Price from" className="w-full pl-8" type='number'
                            onChange={(event) =>
                                table.getColumn("price_over")?.setFilterValue(event.target.value)
                            }
                        />
                    </div>
                    <div className="relative w-full sm:w-[160px]">
                        <Euro
                            className="absolute left-2 h-4 w-4 text-muted-foreground"
                            style={{ top: '13px' }}
                        />
                        <Input
                            placeholder="Price to" className="w-full pl-8" type='number'
                            onChange={(event) =>
                                table.getColumn("price_under")?.setFilterValue(event.target.value)
                            }
                        />
                    </div>
                </div>
            </div>
            <div className="flex w-full justify-end xl:w-auto">
                <DataTableViewOptions table={table} />
            </div>
        </div>
    )
}
