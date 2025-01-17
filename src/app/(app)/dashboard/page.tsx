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
            <div className=" overflow-hidden shadow-sm sm:rounded-lg p-10">
                <div className='flex flex-col gap-10 justify-center items-center'>
                    <div >
                        <div className="text-2xl font-bold text-center mb-5">Properties</div>
                        <div className="flex gap-5">
                            <PropertyStatus data={data.count_property_status}/>
                            <PropertyTypes data={data.count_property_type}/>
                        </div>
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-center mb-5">Contacts</div>
                        <div className="flex">
                            <ContactContactMedium data={data.count_contact_medium}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
