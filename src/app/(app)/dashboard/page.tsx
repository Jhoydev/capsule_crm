import { Overview } from "@/app/(app)/dashboard/components/overview";
import { RecentSales } from "@/app/(app)/dashboard/components/recentSales";
import { TotalRent, TotalSold } from "@/app/(app)/dashboard/components/totalCards";
import { task } from '@/components/shared/data-table/data/tasks';
import { taskSchema } from '@/components/shared/data-table/data/schema';
import { z } from 'zod';
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
