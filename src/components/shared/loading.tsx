'use client';

import { Skeleton } from '@/components/ui/skeleton';

const SidebarItemSkeleton = () => (
    <div className="flex items-center gap-3 px-4 py-2">
        <Skeleton className="h-4 w-4 rounded-sm" />
        <Skeleton className="h-4 w-28" />
    </div>
);

const Loading = () => {
    return (
        <div className="grid h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
            <aside className="hidden border-r bg-muted/40 md:block">
                <div className="flex h-screen sticky top-0 flex-col gap-2">
                    <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                        <Skeleton className="h-6 w-36" />
                        <Skeleton className="ml-auto h-8 w-8 rounded-md" />
                    </div>

                    <div className="flex-1 space-y-2 overflow-hidden py-4">
                        <SidebarItemSkeleton />
                        <SidebarItemSkeleton />
                        <SidebarItemSkeleton />
                        <SidebarItemSkeleton />
                        <SidebarItemSkeleton />
                    </div>

                    <div className="mt-auto p-4">
                        <Skeleton className="h-9 w-full rounded-md" />
                    </div>
                </div>
            </aside>

            <div className="flex min-w-0 flex-col">
                <header className="flex h-14 items-center justify-end gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
                    <Skeleton className="h-9 w-9 rounded-md md:hidden" />
                    <Skeleton className="h-9 w-9 rounded-full" />
                    <Skeleton className="h-9 w-9 rounded-md" />
                </header>

                <main className="flex flex-1 flex-col overflow-auto p-4 lg:p-6">
                    <div className="space-y-5">
                        <div className="space-y-2">
                            <Skeleton className="h-8 w-40" />
                            <Skeleton className="h-4 w-72 max-w-full" />
                        </div>

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 lg:gap-6">
                            <Skeleton className="h-64 w-full rounded-xl" />
                            <Skeleton className="h-64 w-full rounded-xl" />
                            <Skeleton className="h-64 w-full rounded-xl" />
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Loading;
