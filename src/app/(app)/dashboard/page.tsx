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
    } = useDashboard();

    if (loading) {
        return <div className="p-4 text-center text-muted-foreground">Loading dashboard...</div>;
    }

    if (error) {
        return <div className="p-4 text-center text-destructive">Unable to load dashboard data.</div>;
    }

    if (!data) {
        return <div className="p-4 text-center">No data available.</div>;
    }

    return (
        <div className="w-full p-4 lg:p-6">
            <div className="overflow-hidden sm:rounded-lg">
                <div className='flex flex-col gap-5'>
                    <div className="text-2xl font-bold tracking-tight">Dashboard</div>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 lg:gap-6">
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
