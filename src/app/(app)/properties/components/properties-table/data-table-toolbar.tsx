"use client"

import { Table } from "@tanstack/react-table"
import { Input } from "@/components/ui/input"
import { DataTableViewOptions } from '@/components/shared/data-table/data-table-view-options';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { propertySchema } from '@/types/property.types';

interface DataTableToolbarProps<TData> {
    table?: Table<TData>
}

export function DataTableToolbar<TData>({ table }: DataTableToolbarProps<TData>) {
    if (!table) {
        return null
    }

    const types: string[] = propertySchema.type.options

    return (
        <div className="flex items-center justify-between">
            <div className="flex flex-1 items-center space-x-2">
                <Input
                    placeholder="Filter reference..."
                    value={(table.getColumn("reference")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("reference")?.setFilterValue(event.target.value)
                    }
                    className="h-8 w-[150px] lg:w-[250px]"
                />
                <Select
                    onValueChange={(value) =>
                        table.getColumn("type")?.setFilterValue(value)
                    }
                >
                    <SelectTrigger className="w-[180px] capitalize">
                        <SelectValue placeholder="Select a type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {types?.map((item, index) => (
                                <SelectItem className="capitalize" value={item} key={index}>
                                    {item.replace('_', ' ')}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            <DataTableViewOptions table={table} />
        </div>
    )
}
