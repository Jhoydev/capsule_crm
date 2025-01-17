"use client"

import {GeneralizedBarChart} from "@/app/(app)/dashboard/components/GeneralizedBarChart";


export function PropertyTypes({ data }: { data: any[] }) {
    if (!data) {
        return <div>No data available</div>;
    }

    return (
        <GeneralizedBarChart
            data={data}
            keyName="types"
            valueName="count"
            chartTitle="Property types"
            chartDescription="Distribution by types"
        />
    );
}
