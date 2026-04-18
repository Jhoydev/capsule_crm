import { RiMapPin2Line, RiPriceTag3Line, RiFileTextLine } from 'react-icons/ri';

import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

import { PropertyPrintStatusBadge } from './PropertyPrintStatusBadge';
import type { PropertyPrintSummaryViewModel } from './property-print.types';

type PropertyPrintSummaryProps = {
    summary: PropertyPrintSummaryViewModel;
    className?: string;
};

export function PropertyPrintSummary({ summary, className }: PropertyPrintSummaryProps) {
    return (
        <Card
            className={cn(
                'break-inside-avoid overflow-hidden rounded-[24px] border border-slate-200 bg-white text-slate-950 shadow-sm dark:border-slate-200 dark:bg-white dark:text-slate-950 print:shadow-none',
                className
            )}
        >
            <CardContent className="space-y-3.5 p-4 print:space-y-2.5 print:p-3">
                <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-slate-500">
                            {summary.eyebrow ?? 'Ficha comercial'}
                        </p>
                        <p className="mt-1 text-sm font-medium text-slate-600">{summary.reference}</p>
                        <h1 className="mt-1.5 text-[1.55rem] font-semibold leading-tight tracking-tight text-slate-950 sm:text-[1.75rem] print:text-[1.2rem]">
                            {summary.title}
                        </h1>
                    </div>

                    <PropertyPrintStatusBadge status={summary.status} className="shrink-0" />
                </div>

                <div className="rounded-[22px] border border-slate-200 bg-[linear-gradient(180deg,_rgba(248,250,252,0.96),_rgba(255,255,255,1))] p-3.5 print:p-3 print:bg-white">
                    <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-500 shadow-sm print:px-2 print:py-0.5 print:text-[9px]">
                        <RiPriceTag3Line className="h-3.5 w-3.5 print:h-3 print:w-3" />
                        <span>{summary.priceHint ?? 'Precio principal'}</span>
                    </div>

                    <p className="mt-1.5 text-[1.75rem] font-semibold tracking-tight text-slate-950 sm:text-[1.95rem] print:text-[1.35rem]">
                        {summary.priceLabel}
                    </p>

                    {summary.location ? (
                        <div className="mt-2 flex items-start gap-2 rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-3 py-2 print:px-2.5 print:py-1.5 print:bg-white">
                            <RiMapPin2Line className="mt-0.5 h-4 w-4 shrink-0 text-slate-500 print:h-3.5 print:w-3.5" />
                            <p className="text-sm leading-5 text-slate-600 print:text-[11px] print:leading-4">{summary.location}</p>
                        </div>
                    ) : null}
                    {summary.meta?.length ? (
                        <div className="mt-2.5 rounded-2xl border border-slate-200/80 bg-white/85 px-3 py-2.5 print:px-2.5 print:py-2 print:bg-white">
                            <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-slate-500 print:text-[9px]">
                                <RiFileTextLine className="h-3.5 w-3.5 print:h-3 print:w-3" />
                                <span>Detalles clave</span>
                            </div>
                            <div className="mt-1.5 flex flex-wrap gap-1.5">
                                {summary.meta.map((item) => (
                                    <div
                                        key={item}
                                        className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-medium text-slate-700 print:px-2 print:py-0.5 print:text-[10px] print:bg-white"
                                    >
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : null}
                </div>
                {!summary.meta?.length ? (
                    <div className="rounded-[20px] border border-dashed border-slate-300 bg-slate-50/70 px-3 py-2.5 text-sm text-slate-500 print:bg-white">
                        La información comercial se mostrará aquí cuando el view-model la suministre.
                    </div>
                ) : null}
            </CardContent>
        </Card>
    );
}
