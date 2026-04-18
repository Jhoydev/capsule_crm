import { RiHome5Line, RiRulerLine, RiDoorOpenLine, RiDropLine } from 'react-icons/ri';

import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

import type { PropertyPrintFeatureViewModel } from './property-print.types';

type PropertyPrintFeaturesProps = {
    features: PropertyPrintFeatureViewModel[];
    className?: string;
};

const accentByIndex = [
    'bg-sky-500',
    'bg-emerald-500',
    'bg-amber-500',
    'bg-rose-500',
    'bg-indigo-500',
    'bg-slate-500',
];

function getFeatureIcon(label: string) {
    const normalized = label.toLowerCase();

    if (normalized.includes('hab')) {
        return RiDoorOpenLine;
    }

    if (normalized.includes('bañ') || normalized.includes('bath')) {
        return RiDropLine;
    }

    if (normalized.includes('superf') || normalized.includes('area') || normalized.includes('área')) {
        return RiRulerLine;
    }

    return RiHome5Line;
}

function getCompactFeatureLabel(feature: PropertyPrintFeatureViewModel) {
    const key = feature.key?.toLowerCase();

    if (key === 'constructed_area') {
        return 'Construida';
    }

    if (key === 'usable_area') {
        return 'Útil';
    }

    if (key === 'plot_area') {
        return 'Parcela';
    }

    if (key === 'terrace_area') {
        return 'Terraza';
    }

    if (key === 'garage_spaces') {
        return 'Garaje';
    }

    return feature.label;
}

export function PropertyPrintFeatures({ features, className }: PropertyPrintFeaturesProps) {
    const visibleFeatures = features.filter((feature) => feature.label.trim() && feature.value.trim());

    return (
        <Card
            className={cn(
                'break-inside-avoid overflow-hidden rounded-[24px] border border-slate-200 bg-white text-slate-950 shadow-sm dark:border-slate-200 dark:bg-white dark:text-slate-950 print:shadow-none',
                className
            )}
        >
            <CardContent className="p-4 print:p-3">
                <div className="flex items-center justify-between gap-4">
                    <div>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-slate-500">
                            Características destacadas
                        </p>
                        <h2 className="mt-1 text-base font-semibold text-slate-950 print:text-[15px]">
                            Datos visibles para escaparate
                        </h2>
                    </div>

                    <p className="text-[11px] uppercase tracking-[0.24em] text-slate-500 print:text-[10px]">
                        {visibleFeatures.length} elementos
                    </p>
                </div>

                <div className="mt-2.5 grid gap-x-3 gap-y-2 sm:grid-cols-2 print:mt-2 print:gap-x-2 print:gap-y-1.5">
                    {visibleFeatures.length ? (
                        visibleFeatures.map((feature, index) => {
                            const Icon = getFeatureIcon(feature.label);
                            const accent = accentByIndex[index % accentByIndex.length];

                            return (
                                <div
                                    key={`${feature.label}-${feature.value}-${index}`}
                                    className="group relative overflow-hidden rounded-[18px] border border-slate-200 bg-[linear-gradient(180deg,_rgba(248,250,252,0.94),_rgba(255,255,255,1))] px-3 py-2.5 transition-colors print:rounded-[14px] print:bg-white print:px-2 print:py-1.5"
                                >
                                    <div className={cn('absolute left-0 top-0 h-full w-1 rounded-r-full', accent)} />
                                    <div className="flex items-center gap-2.5 pl-1 print:gap-2">
                                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm print:hidden">
                                            <Icon className="h-3.5 w-3.5" />
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500 print:text-[9px]">
                                                {getCompactFeatureLabel(feature)}
                                            </p>
                                            <p className="mt-0.5 text-sm font-semibold leading-tight text-slate-950 print:text-[10.5px]">
                                                {feature.value}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-5 text-sm text-slate-500 sm:col-span-2 xl:col-span-3">
                            El view-model no envió características visibles para la ficha comercial.
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
