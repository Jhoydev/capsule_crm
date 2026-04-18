export type PropertyPrintStatusTone = 'emerald' | 'amber' | 'rose' | 'sky' | 'slate';

export interface PropertyPrintStatusViewModel {
    label: string;
    tone?: PropertyPrintStatusTone;
}

export interface PropertyPrintImageViewModel {
    src: string;
    alt: string;
    featured?: boolean;
}

export interface PropertyPrintFeatureViewModel {
    key?: string;
    label: string;
    value: string;
}

export interface PropertyPrintSummaryViewModel {
    eyebrow?: string;
    reference: string;
    title: string;
    priceLabel: string;
    priceHint?: string;
    location?: string;
    status: PropertyPrintStatusViewModel;
    meta?: string[];
}

export interface PropertyPrintSheetViewModel {
    summary: PropertyPrintSummaryViewModel;
    images: PropertyPrintImageViewModel[];
    features: PropertyPrintFeatureViewModel[];
    description?: string;
    footerNote?: string;
}
