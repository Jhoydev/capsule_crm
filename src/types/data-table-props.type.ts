import { ColumnDef } from '@tanstack/react-table';
import React from 'react';
import { VisibilityState } from '@tanstack/react-table';

export interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    pagination: any
    setPagination: any
    columnFilters: any
    setColumnFilters: any
    setSelectedRowsChange?: any
    total: number
    children?: React.ReactElement
    initialColumnVisibility?: VisibilityState
}
