"use cliente";

import React, { useState } from 'react';
import { BiFirstPage, BiLastPage } from "react-icons/bi";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "../../ui/table";
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable,
} from "@tanstack/react-table";
import {Button} from "@/components/ui/button";

interface DatatableProps<TData, Tvalue> {
    data: TData[];
    columns: ColumnDef<TData, Tvalue>[];
    caption?: string;
}

export default function DataTable<TData, TValue>({
 data,
 columns,
 caption,
}: DatatableProps<TData, TValue>){

    const [pagination, setPagination] = useState({
        pageIndex: 0, //initial page index
        pageSize: 10, //default page size
    });

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(), //load client-side pagination code
        onPaginationChange: setPagination, //update the pagination state when internal APIs mutate the pagination state
        state: {
            //...
            pagination,
        },
    });

    return (
        <div>
            <div className="rounded-md border">
                <Table>
                    {caption && <TableCaption>{caption}</TableCaption>}
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className='flex justify-center w-full mt-5'>
                <Button
                    onClick={() => table.firstPage()}
                    disabled={!table.getCanPreviousPage()}
                    className='mr-5'
                >
                <BiFirstPage className='text-xl'/>
                </Button>
                <Button
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                    className='mr-2'
                >
                <MdNavigateBefore className='text-xl'/>
                </Button>
                <Button
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                    className='mr-5'
                >
                <MdNavigateNext className='text-xl'/>
                </Button>
                <Button
                    onClick={() => table.lastPage()}
                    disabled={!table.getCanNextPage()}
                    className='mr-5'
                >
                <BiLastPage className='text-xl' />
                </Button>
                {/*<select*/}
                {/*    value={table.getState().pagination.pageSize}*/}
                {/*    onChange={e => {*/}
                {/*        table.setPageSize(Number(e.target.value))*/}
                {/*    }}*/}
                {/*>*/}
                {/*    {[10, 20, 30, 40, 50].map(pageSize => (*/}
                {/*        <option key={pageSize} value={pageSize}>*/}
                {/*            {pageSize}*/}
                {/*        </option>*/}
                {/*    ))}*/}
                {/*</select>*/}
            </div>
        </div>

    )
}