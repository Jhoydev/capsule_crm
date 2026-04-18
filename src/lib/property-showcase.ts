import { Image } from '@/types/image.types';
import { Property } from '@/types/property.types';

export type PropertyOperation = 'sale' | 'rent' | 'transfer';

export type PropertyCommercialStatusCode = 'available' | 'pending' | 'sold' | 'rented' | 'off_market' | 'unknown';

export type PropertyCommercialTone = 'positive' | 'warning' | 'negative' | 'neutral';

export type PropertyCommercialStatus = {
    code: PropertyCommercialStatusCode;
    label: string;
    printableLabel: string;
    tone: PropertyCommercialTone;
    rawValue: string;
};

export type PropertyCommercialLocationPrivacy = 'public' | 'partial' | 'hidden';

export type PropertyCommercialLocation = {
    label: string;
    line1: string;
    line2: string | null;
    privacyLevel: PropertyCommercialLocationPrivacy;
};

export type PropertyPrimaryPriceSource = 'sale_price' | 'rent_price' | 'transfer_price' | null;

export type PropertyPrimaryPrice = {
    operation: PropertyOperation | 'unknown';
    sourceField: PropertyPrimaryPriceSource;
    label: string;
    amount: number | null;
    formatted: string | null;
    suffix: string | null;
};

export type PropertyShowcaseFeature = {
    key: string;
    label: string;
    value: string;
    rawValue: string | number;
};

export type PropertyShowcaseImages = {
    primary: string;
    gallery: string[];
    visibleCount: number;
    hasFallback: boolean;
};

export type PropertyShowcaseViewModel = {
    reference: string;
    headline: string;
    title: string;
    type: string;
    description: string;
    status: PropertyCommercialStatus;
    location: PropertyCommercialLocation;
    primaryPrice: PropertyPrimaryPrice;
    features: PropertyShowcaseFeature[];
    images: PropertyShowcaseImages;
};

export type PropertyShowcaseOptions = {
    fallbackImageSrc?: string;
    maxImages?: number;
};

const DEFAULT_FALLBACK_IMAGE = '/images/foto-principal-propiedad.jpg';

const PROPERTY_OPERATION_LABELS: Record<PropertyOperation, string> = {
    sale: 'Venta',
    rent: 'Alquiler',
    transfer: 'Traspaso',
};

const PROPERTY_TYPE_LABELS: Record<string, string> = {
    flat: 'Piso',
    house: 'Casa',
    duplex: 'Dúplex',
    room: 'Habitación',
    garage: 'Garaje',
    country_house: 'Casa rural',
    other: 'Otro',
};

const PROPERTY_STATE_LABELS: Record<string, string> = {
    under_construction: 'En construcción',
    new: 'Nueva',
    reformated: 'Reformada',
    semi_renovated: 'Semi reformada',
    second_hand: 'Segunda mano',
    to_renovate: 'Para reformar',
};

const PROPERTY_STATUS_MAP: Record<
    Exclude<PropertyCommercialStatusCode, 'unknown'>,
    Pick<PropertyCommercialStatus, 'label' | 'printableLabel' | 'tone'>
> = {
    available: {
        label: 'Libre',
        printableLabel: 'Libre',
        tone: 'positive',
    },
    pending: {
        label: 'Reservada',
        printableLabel: 'Reservada',
        tone: 'warning',
    },
    sold: {
        label: 'Vendida',
        printableLabel: 'Vendida',
        tone: 'negative',
    },
    rented: {
        label: 'Alquilada',
        printableLabel: 'Alquilada',
        tone: 'neutral',
    },
    off_market: {
        label: 'Retirada',
        printableLabel: 'Retirada',
        tone: 'neutral',
    },
};

const PROPERTY_PRICE_LABELS: Record<PropertyOperation, { label: string; suffix: string | null }> = {
    sale: {
        label: 'Precio de venta',
        suffix: null,
    },
    rent: {
        label: 'Precio de alquiler',
        suffix: 'al mes',
    },
    transfer: {
        label: 'Precio de traspaso',
        suffix: null,
    },
};

const PROPERTY_FEATURE_LABELS: Record<string, string> = {
    operation: 'Operación',
    type: 'Tipo',
    state: 'Conservación',
    bedrooms: 'Habitaciones',
    bathrooms: 'Baños',
    toilets: 'Aseos',
    garage_spaces: 'Plazas de garaje',
    constructed_area: 'Superficie construida',
    usable_area: 'Superficie útil',
    plot_area: 'Superficie de parcela',
    terrace_area: 'Superficie de terraza',
};

const NUMBER_FORMATTER = new Intl.NumberFormat('es-ES');
const CURRENCY_FORMATTER = new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
});

const toTrimmedString = (value?: string | null): string => {
    if (typeof value !== 'string') {
        return '';
    }

    return value.trim();
};

const toNormalizedKey = (value?: string | null): string => toTrimmedString(value).toLowerCase();

const toPositiveNumber = (value?: number | null): number | null => {
    if (typeof value !== 'number' || !Number.isFinite(value) || value <= 0) {
        return null;
    }

    return value;
};

const humanizeFallback = (value: string): string => value.replace(/_/g, ' ').replace(/\s+/g, ' ').trim();

const formatArea = (value: number): string => `${NUMBER_FORMATTER.format(value)} m²`;

const formatCurrency = (value: number): string => CURRENCY_FORMATTER.format(value);

const isPropertyOperation = (value: string): value is PropertyOperation =>
    value === 'sale' || value === 'rent' || value === 'transfer';

const buildFeature = (key: string, label: string, value: string | number): PropertyShowcaseFeature | null => {
    if (typeof value === 'number') {
        return {
            key,
            label,
            value: NUMBER_FORMATTER.format(value),
            rawValue: value,
        };
    }

    const normalizedValue = toTrimmedString(value);
    if (!normalizedValue) {
        return null;
    }

    return {
        key,
        label,
        value: normalizedValue,
        rawValue: normalizedValue,
    };
};

const getPropertyTypeLabel = (value?: string | null): string => {
    const key = toNormalizedKey(value);
    if (!key) {
        return 'No especificado';
    }

    return PROPERTY_TYPE_LABELS[key] ?? humanizeFallback(key);
};

const getPropertyStateLabel = (value?: string | null): string => {
    const key = toNormalizedKey(value);
    if (!key) {
        return 'No especificado';
    }

    return PROPERTY_STATE_LABELS[key] ?? humanizeFallback(key);
};

const getPropertyOperationLabel = (value?: string | null): string => {
    const key = toNormalizedKey(value) as PropertyOperation;

    if (isPropertyOperation(key)) {
        return PROPERTY_OPERATION_LABELS[key];
    }

    return value ? humanizeFallback(value) : 'No especificada';
};

const formatQuantity = (value: number, singularLabel: string, pluralLabel: string): string => {
    return `${NUMBER_FORMATTER.format(value)} ${value === 1 ? singularLabel : pluralLabel}`;
};

const getPropertyCommercialStatusFromRaw = (status?: string, isAvailable?: boolean): PropertyCommercialStatus => {
    const rawValue = toNormalizedKey(status);
    const mappedStatus = rawValue as Exclude<PropertyCommercialStatusCode, 'unknown'>;

    if (mappedStatus in PROPERTY_STATUS_MAP) {
        const normalizedStatus = PROPERTY_STATUS_MAP[mappedStatus];

        return {
            code: mappedStatus,
            ...normalizedStatus,
            rawValue: rawValue || String(status ?? ''),
        };
    }

    if (isAvailable) {
        return {
            code: 'available',
            ...PROPERTY_STATUS_MAP.available,
            rawValue: rawValue || 'available',
        };
    }

    return {
        code: 'unknown',
        label: 'No disponible',
        printableLabel: 'No disponible',
        tone: 'neutral',
        rawValue: rawValue || String(status ?? ''),
    };
};

export const getPropertyPrimaryPrice = (property: Property): PropertyPrimaryPrice => {
    const normalizedOperation = toNormalizedKey(property.operation);
    const operation = isPropertyOperation(normalizedOperation) ? normalizedOperation : 'unknown';

    const priceCandidates: Array<{
        field: PropertyPrimaryPriceSource;
        operation: PropertyOperation;
        value: number | null;
    }> = [
        {
            field: 'sale_price',
            operation: 'sale',
            value: toPositiveNumber(property.sale_price),
        },
        {
            field: 'rent_price',
            operation: 'rent',
            value: toPositiveNumber(property.rent_price),
        },
        {
            field: 'transfer_price',
            operation: 'transfer',
            value: toPositiveNumber(property.transfer_price),
        },
    ];

    const selectedCandidate =
        priceCandidates.find((candidate) => candidate.operation === operation && candidate.value !== null) ??
        priceCandidates.find((candidate) => candidate.value !== null) ??
        null;

    if (!selectedCandidate || selectedCandidate.value === null) {
        const priceLabel = isPropertyOperation(operation) ? PROPERTY_PRICE_LABELS[operation] : null;

        return {
            operation,
            sourceField: null,
            label: priceLabel?.label ?? 'Precio principal',
            amount: null,
            formatted: null,
            suffix: priceLabel?.suffix ?? null,
        };
    }

    const priceLabel = PROPERTY_PRICE_LABELS[selectedCandidate.operation];
    const formattedAmount = formatCurrency(selectedCandidate.value);

    return {
        operation: selectedCandidate.operation,
        sourceField: selectedCandidate.field,
        label: priceLabel.label,
        amount: selectedCandidate.value,
        formatted: priceLabel.suffix ? `${formattedAmount} ${priceLabel.suffix}` : formattedAmount,
        suffix: priceLabel.suffix,
    };
};

export const getPropertyCommercialStatus = (property: Property): PropertyCommercialStatus =>
    getPropertyCommercialStatusFromRaw(property.status, property.is_available);

export const getPropertyCommercialLocation = (property: Property): PropertyCommercialLocation => {
    const city = toTrimmedString(property.city);
    const zone = toTrimmedString(property.zone);
    const hasCity = Boolean(city);
    const hasZone = Boolean(zone);
    const line1 = hasCity ? city : hasZone ? zone : '';
    const line2 = hasCity && hasZone ? zone : null;

    if (line1) {
        return {
            label: [line1, line2].filter(Boolean).join(' · '),
            line1,
            line2,
            privacyLevel: hasCity && hasZone ? 'public' : 'partial',
        };
    }

    return {
        label: 'Ubicación reservada',
        line1: 'Ubicación reservada',
        line2: null,
        privacyLevel: 'hidden',
    };
};

export const getPropertyFeatureList = (property: Property): PropertyShowcaseFeature[] => {
    const features: Array<PropertyShowcaseFeature | null> = [
        buildFeature('type', PROPERTY_FEATURE_LABELS.type, getPropertyTypeLabel(property.type)),
        buildFeature('state', PROPERTY_FEATURE_LABELS.state, getPropertyStateLabel(property.state)),
        buildFeature('operation', PROPERTY_FEATURE_LABELS.operation, getPropertyOperationLabel(property.operation)),
        property.bedrooms != null && property.bedrooms > 0
            ? buildFeature(
                  'bedrooms',
                  PROPERTY_FEATURE_LABELS.bedrooms,
                  formatQuantity(property.bedrooms, 'habitación', 'habitaciones')
              )
            : null,
        property.bathrooms != null && property.bathrooms > 0
            ? buildFeature(
                  'bathrooms',
                  PROPERTY_FEATURE_LABELS.bathrooms,
                  formatQuantity(property.bathrooms, 'baño', 'baños')
              )
            : null,
        property.toilets != null && property.toilets > 0
            ? buildFeature(
                  'toilets',
                  PROPERTY_FEATURE_LABELS.toilets,
                  formatQuantity(property.toilets, 'aseo', 'aseos')
              )
            : null,
        property.garage_spaces != null && property.garage_spaces > 0
            ? buildFeature(
                  'garage_spaces',
                  PROPERTY_FEATURE_LABELS.garage_spaces,
                  formatQuantity(property.garage_spaces, 'plaza', 'plazas')
              )
            : null,
        property.constructed_area != null && property.constructed_area > 0
            ? buildFeature(
                  'constructed_area',
                  PROPERTY_FEATURE_LABELS.constructed_area,
                  formatArea(property.constructed_area)
              )
            : null,
        property.usable_area != null && property.usable_area > 0
            ? buildFeature('usable_area', PROPERTY_FEATURE_LABELS.usable_area, formatArea(property.usable_area))
            : null,
        property.plot_area != null && property.plot_area > 0
            ? buildFeature('plot_area', PROPERTY_FEATURE_LABELS.plot_area, formatArea(property.plot_area))
            : null,
        property.terrace_area != null && property.terrace_area > 0
            ? buildFeature('terrace_area', PROPERTY_FEATURE_LABELS.terrace_area, formatArea(property.terrace_area))
            : null,
    ];

    return features.filter((feature): feature is PropertyShowcaseFeature => feature !== null);
};

export const getVisiblePropertyImages = (
    property: Property,
    options?: Pick<PropertyShowcaseOptions, 'fallbackImageSrc' | 'maxImages'>
): PropertyShowcaseImages => {
    const fallbackImageSrc = options?.fallbackImageSrc ?? DEFAULT_FALLBACK_IMAGE;
    const maxImages = options?.maxImages && options.maxImages > 0 ? options.maxImages : undefined;

    const visibleImages = (property.image ?? [])
        .filter((image: Image) => Number(image.is_visible) !== 0)
        .slice()
        .sort((left, right) => {
            const orderDiff = (left.order ?? 0) - (right.order ?? 0);
            if (orderDiff !== 0) {
                return orderDiff;
            }

            return left.id - right.id;
        })
        .map((image: Image) => image.image_name)
        .filter((imageName): imageName is string => typeof imageName === 'string' && imageName.trim().length > 0);

    const slicedImages = typeof maxImages === 'number' ? visibleImages.slice(0, maxImages) : visibleImages;

    if (!slicedImages.length) {
        return {
            primary: fallbackImageSrc,
            gallery: [fallbackImageSrc],
            visibleCount: 0,
            hasFallback: true,
        };
    }

    return {
        primary: slicedImages[0],
        gallery: slicedImages,
        visibleCount: slicedImages.length,
        hasFallback: false,
    };
};

export const buildPropertyShowcaseViewModel = (
    property: Property,
    options?: PropertyShowcaseOptions
): PropertyShowcaseViewModel => {
    const primaryPrice = getPropertyPrimaryPrice(property);
    const status = getPropertyCommercialStatus(property);
    const location = getPropertyCommercialLocation(property);
    const images = getVisiblePropertyImages(property, options);
    const features = getPropertyFeatureList(property);
    const title = toTrimmedString(property.title) || property.reference;
    const description = toTrimmedString(property.description);

    return {
        reference: property.reference,
        headline: title,
        title,
        type: getPropertyTypeLabel(property.type),
        description,
        status,
        location,
        primaryPrice,
        features,
        images,
    };
};
