import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonCard() {
    return (
        <div className="flex flex-col space-y-3 items-center">
            <Skeleton className="h-[80px] w-full rounded-xl" />
            <div className="space-y-2">
                <Skeleton className="h-[300px] w-[500px]" />
            </div>
        </div>
    )
}
