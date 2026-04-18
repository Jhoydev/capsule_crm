import { cn } from '@/lib/utils';

import type { PropertyPrintStatusViewModel } from './property-print.types';

type PropertyPrintStatusBadgeProps = {
    status: PropertyPrintStatusViewModel;
    className?: string;
};

const toneClassMap: Record<NonNullable<PropertyPrintStatusViewModel['tone']>, string> = {
    emerald:
        'border-emerald-200 bg-emerald-50 text-emerald-800 shadow-[0_1px_0_rgba(6,95,70,0.04)] print:border-neutral-300 print:bg-white print:text-neutral-900',
    amber:
        'border-amber-200 bg-amber-50 text-amber-800 shadow-[0_1px_0_rgba(146,64,14,0.04)] print:border-neutral-300 print:bg-white print:text-neutral-900',
    rose:
        'border-rose-200 bg-rose-50 text-rose-800 shadow-[0_1px_0_rgba(136,19,55,0.04)] print:border-neutral-300 print:bg-white print:text-neutral-900',
    sky:
        'border-sky-200 bg-sky-50 text-sky-800 shadow-[0_1px_0_rgba(12,74,110,0.04)] print:border-neutral-300 print:bg-white print:text-neutral-900',
    slate:
        'border-slate-200 bg-slate-50 text-slate-800 shadow-[0_1px_0_rgba(15,23,42,0.04)] print:border-neutral-300 print:bg-white print:text-neutral-900',
};

export function PropertyPrintStatusBadge({ status, className }: PropertyPrintStatusBadgeProps) {
    const tone = status.tone ?? 'slate';

    return (
        <div
            className={cn(
                'inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] transition-colors print:px-2.5 print:py-1',
                toneClassMap[tone],
                className
            )}
        >
            <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />
            <span>{status.label}</span>
        </div>
    );
}
