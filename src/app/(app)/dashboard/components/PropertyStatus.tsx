"use client"

import { GeneralizedPieChart } from "@/app/(app)/dashboard/components/GeneralizedPieChart";

export function PropertyStatus({data}: {data: Record<string, number>}) {
    if (!data) {
        return <div>No data available</div>;
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
