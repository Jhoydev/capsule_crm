"use client"

import { GeneralizedPieChart } from "@/app/(app)/dashboard/components/GeneralizedPieChart";

export function PropertyStatus({data}: {data: Record<string, number>}) {
    if (!data || Object.keys(data).length === 0) {
        return <div className="rounded-lg border bg-card p-6 text-center text-sm text-muted-foreground">No data available</div>;
    }

    return (
        <GeneralizedPieChart
            data={data}
            keyName="status"
            valueName="count"
            chartTitle="Property Stats"
            chartDescription="Distribution by Status"
        />
    );
}
