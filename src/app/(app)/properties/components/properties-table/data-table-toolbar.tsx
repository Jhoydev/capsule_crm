"use client"

import { Cross2Icon } from "@radix-ui/react-icons"
import { Table } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DataTableViewOptions } from '@/components/shared/data-table/data-table-view-options';


interface DataTableToolbarProps<TData> {
    table?: Table<TData>
}

export function DataTableToolbar<TData>({ table }: DataTableToolbarProps<TData>) {
    if (!table) {
        return null
    }

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
            </div>
            <DataTableViewOptions table={table} />
        </div>
    )
}
