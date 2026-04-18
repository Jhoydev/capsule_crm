import { Property } from '@/types/property.types';
import { buildPropertyShowcaseViewModel } from '@/lib/property-showcase';
import type { PropertyShowcaseOptions, PropertyShowcaseViewModel } from '@/lib/property-showcase';

export const usePropertyShowcase = (
    property: Property | null | undefined,
    options?: PropertyShowcaseOptions
): PropertyShowcaseViewModel | null => {
    if (!property) {
        return null;
    }

    return buildPropertyShowcaseViewModel(property, options);
};
