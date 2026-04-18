import { Property } from '@/types/property.types';
import {
    buildPropertyShowcaseViewModel,
    getPropertyCommercialLocation,
    getPropertyCommercialStatus,
    getPropertyFeatureList,
    getPropertyPrimaryPrice,
    getVisiblePropertyImages,
} from '@/lib/property-showcase';
import type {
    PropertyCommercialLocation,
    PropertyCommercialStatus,
    PropertyPrimaryPrice,
    PropertyShowcaseFeature,
    PropertyShowcaseImages,
    PropertyShowcaseOptions,
    PropertyShowcaseViewModel,
} from '@/lib/property-showcase';
import type {
    PropertyPrintFeatureViewModel,
    PropertyPrintImageViewModel,
    PropertyPrintSheetViewModel,
    PropertyPrintStatusTone,
} from './property-print.types';

export const PROPERTY_PRINT_FALLBACK_IMAGE = '/images/foto-principal-propiedad.jpg';

export const buildPropertyPrintViewModel = (
    property: Property,
    options?: PropertyShowcaseOptions
): PropertyShowcaseViewModel =>
    buildPropertyShowcaseViewModel(property, {
        fallbackImageSrc: PROPERTY_PRINT_FALLBACK_IMAGE,
        ...options,
    });

const mapStatusToneToPrintTone = (tone: PropertyCommercialStatus['tone']): PropertyPrintStatusTone => {
    switch (tone) {
        case 'positive':
            return 'emerald';
        case 'warning':
            return 'amber';
        case 'negative':
            return 'rose';
        default:
            return 'slate';
    }
};

const toPrintImages = (showcase: PropertyShowcaseViewModel): PropertyPrintImageViewModel[] =>
    showcase.images.gallery.map((src, index) => ({
        src,
        alt: `${showcase.title} - foto ${index + 1}`,
        featured: index === 0,
    }));

const toPrintFeatures = (features: PropertyShowcaseFeature[]): PropertyPrintFeatureViewModel[] =>
    features.map((feature) => ({
        key: feature.key,
        label: feature.label,
        value: feature.value,
    }));

export const buildPropertyPrintSheetViewModel = (
    property: Property,
    options?: PropertyShowcaseOptions
): PropertyPrintSheetViewModel => {
    const showcase = buildPropertyPrintViewModel(property, options);
    const priceLabel = showcase.primaryPrice.formatted ?? 'Consultar precio';
    const meta = [showcase.type, showcase.location.label].filter(Boolean);

    return {
        summary: {
            eyebrow: showcase.primaryPrice.label,
            reference: showcase.reference,
            title: showcase.title,
            priceLabel,
            priceHint: showcase.primaryPrice.suffix ?? undefined,
            location: showcase.location.label,
            status: {
                label: showcase.status.printableLabel,
                tone: mapStatusToneToPrintTone(showcase.status.tone),
            },
            meta,
        },
        images: toPrintImages(showcase),
        features: toPrintFeatures(showcase.features),
        description: showcase.description || undefined,
        footerNote: 'Imprime esta ficha en A4 o guárdala como PDF desde el navegador.',
    };
};

export {
    getPropertyCommercialLocation,
    getPropertyCommercialStatus,
    getPropertyFeatureList,
    getPropertyPrimaryPrice,
    getVisiblePropertyImages,
};

export type {
    PropertyCommercialLocation,
    PropertyCommercialStatus,
    PropertyPrimaryPrice,
    PropertyShowcaseFeature,
    PropertyShowcaseImages,
    PropertyShowcaseOptions,
    PropertyShowcaseViewModel,
};
