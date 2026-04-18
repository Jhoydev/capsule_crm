import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

type SkeletonTableProps = {
    columns?: number;
    rows?: number;
};

const headerWidths = ['w-10', 'w-20', 'w-24', 'w-28', 'w-32', 'w-36'];
const cellWidths = ['w-8', 'w-20', 'w-24', 'w-28', 'w-32', 'w-36'];

export default function SkeletonTable({ columns = 6, rows = 6 }: SkeletonTableProps) {
    const rowArray = Array.from({ length: rows });
    const columnArray = Array.from({ length: columns });

    return (
        <div className="min-w-0 space-y-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-1 items-center gap-2">
                    <Skeleton className="h-10 w-full max-w-sm rounded-md" />
                    <Skeleton className="h-10 w-24 rounded-md" />
                </div>
                <div className="flex items-center gap-2">
                    <Skeleton className="h-10 w-28 rounded-md" />
                    <Skeleton className="h-10 w-10 rounded-md" />
                </div>
            </div>

            <div className="min-w-0 overflow-hidden rounded-md border">
                <Table className="min-w-full">
                    <TableHeader>
                        <TableRow>
                            {columnArray.map((_, colIndex) => (
                                <TableHead key={`header-${colIndex}`}>
                                    <Skeleton className={`h-4 ${headerWidths[colIndex % headerWidths.length]}`} />
                                </TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {rowArray.map((_, rowIndex) => (
                            <TableRow key={`row-${rowIndex}`}>
                                {columnArray.map((_, colIndex) => (
                                    <TableCell key={`cell-${rowIndex}-${colIndex}`}>
                                        {colIndex === 0 ? (
                                            <Skeleton className="h-4 w-4 rounded-sm" />
                                        ) : colIndex === 1 ? (
                                            <div className="flex items-center gap-3">
                                                <Skeleton className="h-9 w-9 rounded-full" />
                                                <Skeleton className="h-4 w-24" />
                                            </div>
                                        ) : (
                                            <Skeleton
                                                className={`h-4 ${cellWidths[(rowIndex + colIndex) % cellWidths.length]}`}
                                            />
                                        )}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <div className="flex flex-col gap-3 px-2 sm:flex-row sm:items-center sm:justify-between">
                <Skeleton className="h-4 w-40" />
                <div className="flex flex-wrap items-center gap-3 sm:gap-6">
                    <div className="flex items-center gap-2">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-8 w-[70px] rounded-md" />
                    </div>
                    <Skeleton className="h-4 w-28" />
                    <div className="flex items-center gap-2">
                        <Skeleton className="hidden h-8 w-8 rounded-md lg:block" />
                        <Skeleton className="h-8 w-8 rounded-md" />
                        <Skeleton className="h-8 w-8 rounded-md" />
                        <Skeleton className="hidden h-8 w-8 rounded-md lg:block" />
                    </div>
                </div>
            </div>
        </div>
    );
}
