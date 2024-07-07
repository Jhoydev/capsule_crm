import { Overview } from "@/modules/dashboard/components/overview";
import { RecentSales } from "@/modules/dashboard/components/recentSales";
import { TotalRent, TotalSold } from "@/modules/dashboard/components/totalCards";
import { DataTable } from '@/components/shared/data-table/data-table';
import { task } from '@/components/shared/data-table/data/tasks';
import { taskSchema } from '@/components/shared/data-table/data/schema';
import { z } from 'zod';
import { columns } from '@/components/shared/data-table/data/columns';
import { DataTableToolbar } from '@/components/shared/data-table/data-table-toolbar';
import * as React from 'react';

export const metadata = {
    title: 'Dashboard',
}

function getTasks() {
    return z.array(taskSchema).parse(task)
}

const Dashboard = () => {
    const tasks = getTasks()

    return (
        <div className="w-full gap-4 p-4 lg:gap-6 lg:p-6">
            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div className="flex items-center justify-between">
                    <DataTable data={tasks} columns={columns}>
                        <DataTableToolbar/>
                    </DataTable>
                </div>
                <div className='flex'>
                    <TotalSold></TotalSold>
                    <TotalRent></TotalRent>
                </div>
                <div className='flex mt-5'>
                    <Overview></Overview>
                    <RecentSales></RecentSales>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
