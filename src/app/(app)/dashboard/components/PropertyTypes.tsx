"use client"

import { GeneralizedPieChart } from "@/app/(app)/dashboard/components/GeneralizedPieChart";
import * as React from "react";
import { PropertyService } from "@/services/property.service";
import {GeneralizedBarChart} from "@/app/(app)/dashboard/components/GeneralizedBarChart";
import {SkeletonCard} from "@/components/SkeletonCard";

export function PropertyTypes({ data }) {
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
