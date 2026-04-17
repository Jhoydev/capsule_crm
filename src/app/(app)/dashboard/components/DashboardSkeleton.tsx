'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

function PieChartSkeletonCard() {
    return (
        <Card className="flex h-full min-w-0 flex-col">
            <CardHeader className="items-center px-4 pb-0 pt-4 text-center sm:px-6 sm:pt-6">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="mt-2 h-4 w-40" />
            </CardHeader>
            <CardContent className="flex flex-1 items-center justify-center px-3 pb-4 pt-4 sm:px-6 sm:pb-6">
                <div className="relative flex h-[220px] w-full max-w-[280px] items-center justify-center sm:h-[250px] sm:max-w-[320px]">
                    <Skeleton className="h-40 w-40 rounded-full sm:h-48 sm:w-48" />
                    <Skeleton className="absolute h-20 w-20 rounded-full bg-background sm:h-24 sm:w-24" />
                </div>
            </CardContent>
        </Card>
    );
}

function BarChartSkeletonCard() {
    return (
        <Card className="flex h-full min-w-0 flex-col">
            <CardHeader className="px-4 pb-0 pt-4 sm:px-6 sm:pt-6">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="mt-2 h-4 w-36" />
            </CardHeader>
            <CardContent className="px-3 pb-4 pt-4 sm:px-6 sm:pb-6">
                <div className="flex h-[220px] items-end gap-3 sm:h-[250px]">
                    <Skeleton className="h-28 w-full rounded-md" />
                    <Skeleton className="h-40 w-full rounded-md" />
                    <Skeleton className="h-20 w-full rounded-md" />
                    <Skeleton className="h-32 w-full rounded-md" />
                </div>
            </CardContent>
        </Card>
    );
}

export function DashboardSkeleton() {
    return (
        <div className="w-full p-4 lg:p-6">
            <div className="overflow-hidden sm:rounded-lg">
                <div className="flex flex-col gap-5">
                    <div className="space-y-2">
                        <Skeleton className="h-8 w-40" />
                        <Skeleton className="h-4 w-64 max-w-full" />
                    </div>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 lg:gap-6">
                        <PieChartSkeletonCard />
                        <BarChartSkeletonCard />
                        <PieChartSkeletonCard />
                    </div>
                </div>
            </div>
        </div>
    );
}
