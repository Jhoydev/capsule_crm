"use client";

import React, { useEffect, useState } from 'react';
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
    getCoreRowModel, Row,
    useReactTable,
} from "@tanstack/react-table";
import { fetchPaginatedData } from '@/services/paginationApi';  // Importa la función API genérica
import { PaginatedResponse } from '@/types/pagination.types';
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Contact } from "@/types/contact.types";

interface DatatableProps<T> {
    endPoint: string;
    typeTable: string;
    columns: ColumnDef<T, any>[];
    caption?: string;
}

export default function DataTable<T>({
                                         endPoint,
                                         typeTable,
                                         columns,
                                         caption,
                                     }: DatatableProps<T>) {
    const router = useRouter();
    const [pagination, setPagination] = useState({
        pageIndex: 0, // initial page index
        pageSize: 10, // default page size
    });
    const [data, setData] = useState<T[]>([]);
    const [pageCount, setPageCount] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        const fetchDataFromAPI = async () => {
            setIsLoading(true);
            setIsError(false);
            try {
                const response: PaginatedResponse<T> = await fetchPaginatedData<T>(endPoint, pagination.pageIndex, pagination.pageSize);
                setData(response.data);
                setPageCount(response.last_page);
            } catch (error) {
                console.error('Error fetching data:', error);
                setIsError(true);
            }
            setIsLoading(false);
        };

        fetchDataFromAPI();
    }, [endPoint, pagination.pageIndex, pagination.pageSize]);

    const handleRowClick = (row: Row<T>) => {
        let url = '';

        switch (typeTable) {
            case 'contacts':
                const contact = row.original as Contact;
                const id = contact.id;
                url = `/contacts/${id}`;
                break;
            default:
                return;
        }

        router.push(url);
    };

    const table = useReactTable({
        data,
        columns,
        manualPagination: true, // Enable manual pagination
        getCoreRowModel: getCoreRowModel(),
        onPaginationChange: setPagination, // update the pagination state when internal APIs mutate the pagination state
        state: {
            pagination,
        },
        pageCount,
    });

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error loading data</div>;

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
                                    onClick={() => handleRowClick(row)}
                                    className="cursor-pointer hover:bg-gray-100"
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
                    onClick={() => table.setPageIndex(0)}
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
                <span className='mx-2 flex items-center'>
                    {table.getState().pagination.pageIndex + 1} / {table.getPageCount()}
                </span>
                <Button
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                    className='mr-5'
                >
                    <MdNavigateNext className='text-xl'/>
                </Button>
                <Button
                    onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                    disabled={!table.getCanNextPage()}
                    className='mr-5'
                >
                    <BiLastPage className='text-xl'/>
                </Button>
            </div>
        </div>
    )
}
