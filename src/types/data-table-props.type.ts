import { ColumnDef } from '@tanstack/react-table';
import React from 'react';

export interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    pagination: any
    setPagination: any
    total: number
    children?: React.ReactElement
}
