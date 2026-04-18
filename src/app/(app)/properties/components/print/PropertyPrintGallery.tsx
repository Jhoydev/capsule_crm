/* eslint-disable @next/next/no-img-element */

import { RiImage2Line } from 'react-icons/ri';

import { cn } from '@/lib/utils';

import type { PropertyPrintImageViewModel } from './property-print.types';

type PropertyPrintGalleryProps = {
    images: PropertyPrintImageViewModel[];
    title: string;
    className?: string;
};

function getPrimaryImage(images: PropertyPrintImageViewModel[]) {
    return images.find((image) => image.featured) ?? images[0];
}

export function PropertyPrintGallery({ images, title, className }: PropertyPrintGalleryProps) {
    const sanitizedImages = images.filter((image) => image.src.trim());
    const primaryImage = getPrimaryImage(sanitizedImages);
    const secondaryImages = sanitizedImages.filter((image) => image.src !== primaryImage?.src).slice(0, 2);
    const hasSecondaryImages = sanitizedImages.length > 1;
    const hasSingleSecondaryImage = secondaryImages.length === 1;

    return (
        <section
            className={cn(
                'break-inside-avoid h-fit self-start overflow-hidden rounded-[24px] border border-slate-200 bg-white text-slate-950 dark:border-slate-200 dark:bg-white dark:text-slate-950 print:rounded-[18px]',
                className
            )}
        >
            {primaryImage ? (
                <div className="relative overflow-hidden bg-slate-100">
                    {hasSecondaryImages ? (
                        <div className="grid aspect-[16/6.8] grid-cols-[1.8fr_0.82fr] gap-2 p-2 print:aspect-[16/6.1] print:gap-1.5 print:p-1.5">
                            <div className="relative overflow-hidden rounded-[20px] bg-slate-100 print:rounded-[14px]">
                                <img
                                    src={primaryImage.src}
                                    alt={primaryImage.alt || title}
                                    className="h-full w-full object-cover"
                                    loading="eager"
                                    decoding="async"
                                />
                                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-transparent" />
                            </div>

                            <div
                                className={cn(
                                    'grid gap-2 print:gap-1.5',
                                    hasSingleSecondaryImage ? 'grid-rows-1' : 'grid-rows-2'
                                )}
                            >
                                {secondaryImages.map((image, index) => {
                                    return (
                                        <div
                                            key={`${image.src}-${index}`}
                                            className="relative overflow-hidden rounded-[18px] border border-slate-200 bg-slate-100 print:rounded-[12px]"
                                        >
                                            <img
                                                src={image.src}
                                                alt={image.alt || `${title} - foto ${index + 2}`}
                                                className="h-full w-full object-cover"
                                                loading="lazy"
                                                decoding="async"
                                            />
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ) : (
                        <div className="relative aspect-[16/6.9] w-full print:aspect-[16/6]">
                            <img
                                src={primaryImage.src}
                                alt={primaryImage.alt || title}
                                className="h-full w-full object-cover"
                                loading="eager"
                                decoding="async"
                            />
                            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/18 via-transparent to-transparent" />
                        </div>
                    )}
                </div>
            ) : (
                <div className="flex aspect-[16/10] items-center justify-center bg-[linear-gradient(135deg,_rgba(148,163,184,0.18),_rgba(255,255,255,0.85))] px-6 text-center">
                    <div className="max-w-sm">
                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-dashed border-slate-300 bg-white/80 text-slate-500 shadow-sm">
                            <RiImage2Line className="h-6 w-6" />
                        </div>
                        <p className="mt-4 text-sm font-semibold text-slate-900">Sin fotos disponibles</p>
                        <p className="mt-1 text-sm text-muted-foreground">
                            La ficha sigue siendo imprimible aunque el inmueble todavía no tenga imágenes visibles.
                        </p>
                    </div>
                </div>
            )}

            {hasSecondaryImages && secondaryImages.length === 0 ? (
                <div className="border-t border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-500">
                    La primera imagen se mostrará como portada principal en la versión impresa.
                </div>
            ) : null}
        </section>
    );
}
