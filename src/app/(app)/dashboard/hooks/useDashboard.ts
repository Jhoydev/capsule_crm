"use client"

import { useCallback, useEffect, useState } from 'react';
import { DashboardService } from '@/services/dashboard.service';
import { DashboardResponseType } from '@/types/dashboard.type';
import { PropertyService } from '@/services/property.service';
import { ContactService } from '@/services/contact.service';

const isRecord = (value: unknown): value is Record<string, unknown> =>
    typeof value === 'object' && value !== null && !Array.isArray(value);

const toNumberRecord = (value: unknown): Record<string, number> => {
    if (Array.isArray(value)) {
        return value.reduce<Record<string, number>>((acc, item) => {
            if (!isRecord(item)) return acc;

            for (const [key, entryValue] of Object.entries(item)) {
                const numericValue = Number(entryValue);

                if (Number.isFinite(numericValue)) {
                    acc[key] = numericValue;
                }
            }

            return acc;
        }, {});
    }

    if (isRecord(value)) {
        return Object.entries(value).reduce<Record<string, number>>((acc, [key, entryValue]) => {
            const numericValue = Number(entryValue);

            if (Number.isFinite(numericValue)) {
                acc[key] = numericValue;
            }

            return acc;
        }, {});
    }

    return {};
};

const pickFirstRecord = (
    source: Record<string, unknown>,
    candidateKeys: string[]
): Record<string, number> => {
    for (const key of candidateKeys) {
        if (key in source) {
            const normalized = toNumberRecord(source[key]);

            if (Object.keys(normalized).length > 0) {
                return normalized;
            }
        }
    }

    return {};
};

export function useDashboard() {
    const [data, setData] = useState<DashboardResponseType | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const dashboardService = new DashboardService();
            const propertyService = new PropertyService();
            const contactService = new ContactService();
            const dashboardServiceRes = await dashboardService.get();
            const dashboardPayload = isRecord(dashboardServiceRes)
                ? (isRecord(dashboardServiceRes.data) ? dashboardServiceRes.data : dashboardServiceRes)
                : {};

            let countPropertyStatus = pickFirstRecord(dashboardPayload, [
                'count_property_status',
                'property_status',
                'properties_by_status',
                'status',
            ]);
            let countPropertyType = pickFirstRecord(dashboardPayload, [
                'count_property_type',
                'property_type',
                'properties_by_type',
                'types',
            ]);
            let countContactMedium = pickFirstRecord(dashboardPayload, [
                'count_contact_medium',
                'contact_medium',
                'contacts_by_medium',
                'medium',
            ]);

            if (
                Object.keys(countPropertyStatus).length === 0 ||
                Object.keys(countPropertyType).length === 0 ||
                Object.keys(countContactMedium).length === 0
            ) {
                const [statusRes, typeRes, mediumRes] = await Promise.all([
                    propertyService.statsStatus(),
                    propertyService.statsTypes(),
                    contactService.statsContactMedium(),
                ]);

                if (Object.keys(countPropertyStatus).length === 0) {
                    countPropertyStatus = toNumberRecord(statusRes.data);
                }

                if (Object.keys(countPropertyType).length === 0) {
                    countPropertyType = toNumberRecord(typeRes.data);
                }

                if (Object.keys(countContactMedium).length === 0) {
                    countContactMedium = toNumberRecord(mediumRes.data);
                }
            }

            setData({
                count_property_status: countPropertyStatus,
                count_property_type: countPropertyType,
                count_contact_medium: countContactMedium,
            });
        } catch (err: any) {
            console.error("Error fetching property status data:", err);
            setError(err.message || "Error desconocido");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { data, loading, error, refetch: fetchData };
}
