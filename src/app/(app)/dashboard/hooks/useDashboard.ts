"use client"

import { useCallback, useEffect, useState } from 'react';
import { DashboardService } from '@/services/dashboard.service';
import { DashboardResponseType } from '@/types/dashboard.type';

interface UsePropertyStatsResult {
    data: Record<string, number> | null;
    loading: boolean;
    error: string | null;
    refetch: () => void;
}

export function useDashboard() {
    const [data, setData] = useState<DashboardResponseType | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const dashboardService = new DashboardService();
            const dashboardServiceRes = await dashboardService.get();

            setData(dashboardServiceRes);
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
