'use client';

import Link from 'next/link';
import { useCallback } from 'react';
import { useParams } from 'next/navigation';
import { FaArrowLeft, FaPrint } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { PropertyPrintSheet } from '@/app/(app)/properties/components/print/PropertyPrintSheet';
import {
    buildPropertyPrintSheetViewModel,
    PROPERTY_PRINT_FALLBACK_IMAGE,
} from '@/app/(app)/properties/components/print/property-print.utils';
import type { PropertyPrintSheetViewModel } from '@/app/(app)/properties/components/print/property-print.types';
import { usePropertyData } from '@/hooks/property/usePropertyData';

const ENABLE_PRINT_STRESS_TEST = true;

const MOCK_PRINT_DESCRIPTION = `Vivienda singular con una puesta en escena muy cuidada, pensada para cliente que valora diseño, luz natural y una distribución cómoda para el día a día.

La propiedad ofrece una zona principal amplia, imagen contemporánea y un planteamiento comercial muy claro para escaparate, dossier o visita. La sensación general es de amplitud, orden y buena entrada de luz, con estancias que resultan agradables tanto para uso habitual como para presentación comercial.

En el entorno inmediato encontramos servicios, conexiones y puntos de interés que refuerzan su atractivo para distintos perfiles de comprador o inquilino. Es una opción especialmente interesante para quien busca una vivienda con presencia visual, buena lectura en ficha comercial y potencial para destacar frente a otras propiedades del mismo segmento.

La descripción está alargada de forma intencionada para validar el comportamiento de la maqueta impresa cuando coinciden varias fotografías visibles y bastante contenido editorial dentro de una sola página A4.`;

function buildMockStressTestSheet(sheet: PropertyPrintSheetViewModel): PropertyPrintSheetViewModel {
    const primaryImage = sheet.images.find((image) => image.src.trim()) ?? {
        src: PROPERTY_PRINT_FALLBACK_IMAGE,
        alt: `${sheet.summary.title} - foto 1`,
        featured: true,
    };

    const mockedImages = Array.from({ length: 4 }, (_, index) => ({
        src: `${sheet.images[index]?.src?.trim() ? sheet.images[index].src : primaryImage.src}${
            (sheet.images[index]?.src?.trim() ? sheet.images[index].src : primaryImage.src).includes('?') ? '&' : '?'
        }mockPrintImage=${index + 1}`,
        alt: `${sheet.summary.title} - mock foto ${index + 1}`,
        featured: index === 0,
    }));

    return {
        ...sheet,
        images: mockedImages,
        description: MOCK_PRINT_DESCRIPTION,
        footerNote: 'Mock activo: prueba de concepto con 4 fotos y descripción larga para revisar la impresión.',
    };
}

const PropertyPrintPage = () => {
    const { id } = useParams<{ id?: string }>();
    const { property, loading, error } = usePropertyData();

    const handlePrint = useCallback(() => {
        window.print();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-background p-6">
                <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
                    <div className="h-12 w-full animate-pulse rounded-xl bg-muted" />
                    <div className="h-[70vh] animate-pulse rounded-3xl border bg-muted/50" />
                </div>
            </div>
        );
    }

    if (error || !property) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-background p-6">
                <div className="w-full max-w-xl rounded-2xl border bg-card p-6 shadow-sm">
                    <p className="text-sm font-medium text-destructive">No hemos podido cargar la ficha imprimible.</p>
                    <p className="mt-2 text-sm text-muted-foreground">
                        Vuelve al detalle de la propiedad y reinténtalo en unos segundos.
                    </p>
                    <Button asChild className="mt-6">
                        <Link href={id ? `/properties/${id}` : '/properties'}>
                            <FaArrowLeft />
                            <span className="ml-2">Volver</span>
                        </Link>
                    </Button>
                </div>
            </div>
        );
    }

    const baseSheet = buildPropertyPrintSheetViewModel(property);
    const sheet = ENABLE_PRINT_STRESS_TEST ? buildMockStressTestSheet(baseSheet) : baseSheet;

    return (
        <div className="relative min-h-screen bg-background px-4 py-4 text-foreground sm:px-6 sm:py-6 print:bg-white print:px-0 print:py-0">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-[radial-gradient(circle_at_top_left,_rgba(14,165,233,0.08),_transparent_36%),radial-gradient(circle_at_top_right,_rgba(15,23,42,0.08),_transparent_32%)] dark:bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.14),_transparent_36%),radial-gradient(circle_at_top_right,_rgba(148,163,184,0.12),_transparent_34%)] print:hidden" />
            <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
                <div className="relative flex items-center justify-between gap-4 print:hidden">
                    <div className="space-y-1">
                        <p className="text-xs font-medium uppercase tracking-[0.24em] text-muted-foreground">
                            Ficha comercial
                        </p>
                        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
                            {property.title ?? property.reference}
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            {ENABLE_PRINT_STRESS_TEST
                                ? 'Vista en modo mock: 4 fotos y descripción larga para validar el peor caso antes de imprimir.'
                                : 'La vista previa mantiene el tema del CRM y reserva la ficha en blanco para el resultado final de impresión.'}
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <Button
                            asChild
                            variant="outline"
                            className="border-border/70 bg-background/85 text-foreground shadow-sm backdrop-blur hover:bg-accent/80 hover:text-accent-foreground"
                        >
                            <Link href={`/properties/${property.id}`}>
                                <FaArrowLeft />
                                <span className="ml-2">Volver</span>
                            </Link>
                        </Button>
                        <Button
                            type="button"
                            onClick={handlePrint}
                            className="bg-primary text-primary-foreground shadow-sm hover:bg-primary/90"
                        >
                            <FaPrint />
                            <span className="ml-2">Imprimir</span>
                        </Button>
                    </div>
                </div>

                <main className="print-sheet-page relative rounded-[28px] border border-border/70 bg-white/96 p-4 shadow-[0_18px_60px_rgba(15,23,42,0.12)] backdrop-blur print:border-0 print:bg-white print:p-0 print:shadow-none sm:p-5">
                    <PropertyPrintSheet sheet={sheet} onPrint={handlePrint} />
                </main>
            </div>
        </div>
    );
};

export default PropertyPrintPage;
