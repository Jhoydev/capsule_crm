"use client"

import * as React from 'react';
import {PropertyStatus} from "@/app/(app)/dashboard/components/PropertyStatus";
import {PropertyTypes} from "@/app/(app)/dashboard/components/PropertyTypes";
import {ContactContactMedium} from "@/app/(app)/dashboard/components/ContactContactMedium";
import { useDashboard } from '@/app/(app)/dashboard/hooks/useDashboard';

const Dashboard = () => {
    const {
        data,
        loading,
        error,
        refetch
    } = useDashboard();

    if (!data) {
        return <div className="p-4 text-center">No data available.</div>;
    }

    return (
        <div className="w-full gap-4 p-4 lg:gap-6 lg:p-6">
            <div className=" overflow-hidden sm:rounded-lg">
                <div className='flex flex-col gap-5 justify-center'>
                    <div className="text-2xl font-bold">Dashboard</div>
                    <div className="flex gap-5">
                        <PropertyStatus data={data.count_property_status}/>
                        <PropertyTypes data={data.count_property_type}/>
                        <ContactContactMedium data={data.count_contact_medium}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
