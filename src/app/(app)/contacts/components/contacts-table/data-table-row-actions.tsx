"use client"
import { Row } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import React from 'react';
import {useRouter} from "next/navigation";
import {ChevronRight} from "lucide-react";

interface DataTableRowActionsProps<TData> {
    row: Row<TData>
}

export function DataTableRowActions<TData>({ row, }: DataTableRowActionsProps<TData>) {
    const router = useRouter();
    const id = row.getValue('id');
    return (
        <div className="text-right">
            <Button variant="outline" size="icon" onClick={() => router.push(`/contacts/${id}`)}>
                <ChevronRight />
            </Button>
        </div>
    )
}
