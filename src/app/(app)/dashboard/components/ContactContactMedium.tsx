"use client"

import { GeneralizedPieChart } from "@/app/(app)/dashboard/components/GeneralizedPieChart";
import * as React from "react";
import {ContactService} from "@/services/contact.service";
import {SkeletonCard} from "@/components/SkeletonCard";

export function ContactContactMedium({data}: { data: Record<string, number> }) {

    if (!data) {
        return <div>No data available</div>;
    }

    return (
        <GeneralizedPieChart
            data={data}
            keyName="contact_medium"
            valueName="count"
            chartTitle="Contact Stats"
            chartDescription="Distribution by contact medium"
        />
    );
}
