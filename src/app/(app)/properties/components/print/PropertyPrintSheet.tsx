'use client';

import { RiPrinterLine, RiSparkling2Line } from 'react-icons/ri';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

import { PropertyPrintFeatures } from './PropertyPrintFeatures';
import { PropertyPrintGallery } from './PropertyPrintGallery';
import { PropertyPrintSummary } from './PropertyPrintSummary';
import type { PropertyPrintSheetViewModel } from './property-print.types';

type PropertyPrintSheetProps = {
    sheet: PropertyPrintSheetViewModel;
    className?: string;
    onPrint?: () => void;
};

export function PropertyPrintSheet({ sheet, className, onPrint }: PropertyPrintSheetProps) {
    const handlePrint = () => {
        if (onPrint) {
            onPrint();
            return;
        }

        window.print();
    };

    return (
        <section
            className={cn(
                'relative isolate mx-auto w-full max-w-[210mm] px-2 py-3 text-foreground sm:px-3 sm:py-4 print:max-w-none print:px-0 print:py-0',
                className
            )}
        >
            <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-56 bg-[radial-gradient(circle_at_top_left,_rgba(14,165,233,0.14),_transparent_32%),radial-gradient(circle_at_top_right,_rgba(15,23,42,0.1),_transparent_26%)] print:hidden" />
            <div className="mb-3 flex flex-wrap items-end justify-between gap-4 print:hidden">
                <div>
                    <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-muted-foreground">
                        <RiSparkling2Line className="h-4 w-4" />
                        <span>{sheet.summary.eyebrow ?? 'Ficha comercial imprimible'}</span>
                    </p>
                    <h2 className="mt-2 text-lg font-semibold text-foreground">
                        Previsualización en papel, lista para A4 o PDF
                    </h2>
                </div>

                <Button
                    type="button"
                    onClick={handlePrint}
                    className="bg-primary text-primary-foreground shadow-sm hover:bg-primary/90"
                >
                    <RiPrinterLine className="h-4 w-4" />
                    Imprimir ficha
                </Button>
            </div>

            <Card className="paper-sheet overflow-hidden rounded-[28px] border border-slate-200 bg-[linear-gradient(180deg,_rgba(255,255,255,0.98),_rgba(248,250,252,0.96))] text-slate-950 shadow-[0_24px_80px_rgba(15,23,42,0.08)] dark:border-slate-200 dark:bg-white dark:text-slate-950 print:rounded-none print:border-0 print:bg-white print:shadow-none">
                <CardContent className="space-y-3 p-3.5 print:space-y-2 print:p-0">
                    <PropertyPrintGallery
                        images={sheet.images}
                        title={sheet.summary.title}
                        className="print-sheet-gallery"
                    />

                    <div className="grid items-start gap-3 lg:grid-cols-[0.96fr_1.04fr] print:grid-cols-[0.96fr_1.04fr] print:gap-2">
                        <PropertyPrintSummary summary={sheet.summary} className="print-sheet-summary" />
                        <PropertyPrintFeatures features={sheet.features} className="print-sheet-features" />
                    </div>

                    <Card className="print-sheet-description-card break-inside-avoid rounded-[24px] border border-slate-200 bg-white text-slate-950 shadow-sm dark:border-slate-200 dark:bg-white dark:text-slate-950 print:shadow-none">
                        <CardContent className="p-4 print:p-3">
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-slate-500">
                                        Descripción
                                    </p>
                                    <h2 className="mt-1 text-base font-semibold text-slate-950">
                                        Resumen comercial
                                    </h2>
                                </div>

                                {sheet.footerNote ? (
                                    <p className="hidden max-w-[11rem] text-right text-[11px] leading-4 text-slate-500 lg:block print:hidden">
                                        {sheet.footerNote}
                                    </p>
                                ) : null}
                            </div>

                            <div className="mt-2 rounded-[20px] border border-slate-200 bg-[linear-gradient(180deg,_rgba(248,250,252,0.92),_rgba(255,255,255,1))] p-2.5 print:bg-white">
                                {sheet.description ? (
                                    <p className="print-sheet-description whitespace-pre-line text-[12px] leading-[1.58] text-slate-700 print:text-[9.75px] print:leading-[1.28]">
                                        {sheet.description}
                                    </p>
                                ) : (
                                    <p className="text-sm leading-6 text-slate-500">
                                        El view-model todavía no contiene una descripción visible para la ficha comercial.
                                    </p>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </CardContent>
            </Card>
        </section>
    );
}

export type { PropertyPrintSheetViewModel } from './property-print.types';
