'use client';

import { Skeleton } from '@/components/ui/skeleton';

function EcardToolbarSkeleton() {
    return (
        <div className="flex items-center justify-between gap-4 border-b shadow-sm bg-muted/40 p-4">
            <div className="flex items-center gap-3">
                <Skeleton className="h-4 w-10" />
                <Skeleton className="h-10 w-40" />
            </div>
            <Skeleton className="h-10 w-28" />
        </div>
    );
}

function EcardPreviewSkeleton() {
    return (
        <div className="w-full max-w-xs mx-auto aspect-[9/16] rounded-[2rem] shadow-2xl overflow-hidden border border-gray-300 bg-white relative">
            <div className="absolute inset-0 p-6 bg-muted/40">
                <div className="flex h-full flex-col items-center text-center">
                    <Skeleton className="h-24 w-24 rounded-full border-4 border-white/80" />
                    <Skeleton className="mt-4 h-7 w-40" />
                    <Skeleton className="mt-2 h-4 w-28" />

                    <div className="mt-8 flex w-full flex-col gap-3">
                        <Skeleton className="h-12 w-full rounded-xl" />
                        <Skeleton className="h-12 w-full rounded-xl" />
                        <Skeleton className="h-10 w-3/4 self-center rounded-lg" />
                    </div>

                    <div className="mt-auto w-full">
                        <Skeleton className="h-10 w-40 mx-auto rounded-md" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export function EcardSkeleton() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-start">
            <div className="md:col-span-5">
                <EcardToolbarSkeleton />
            </div>

            <div className="md:col-span-5 flex justify-center">
                <EcardPreviewSkeleton />
            </div>
        </div>
    );
}
