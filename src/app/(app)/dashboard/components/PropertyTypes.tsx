"use client"

import {GeneralizedBarChart} from "@/app/(app)/dashboard/components/GeneralizedBarChart";


export function PropertyTypes({ data }: { data: any[] }) {
    if (!data || Object.keys(data).length === 0) {
        return <div className="rounded-lg border bg-card p-6 text-center text-sm text-muted-foreground">No data available</div>;
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
