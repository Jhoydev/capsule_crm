import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { PropertyService } from '@/services/property.service';
import { Property } from '@/types/property.types';
import { PropertyFormValues } from '@/utils/forms/property.utils';
import { useCallback, useMemo } from 'react';

export const usePropertyHandlers = (
    data: Property | null,
    isNew?: boolean,
    rechargeFunctionProperty?: (propertyData: Property) => void,
    onDone?: () => void
) => {
    const { toast } = useToast();
    const router = useRouter();
    const propertyService = useMemo(() => new PropertyService(), []);

    const showToast = useCallback(
        (title: string, description: string, variant: 'default' | 'destructive' = 'default') => {
            toast({ title, description, variant });
        },
        [toast]
    );

    const handleSubmit = useCallback(
        async (values: PropertyFormValues): Promise<void> => {
            try {
                if (isNew) {
                    const { property } = await propertyService.save(values);
                    router.push(`/properties/${property.id}`);
                    return;
                }

                if (!data) return;

                const updatedProperty = { id: data.id, ...values };
                const { property } = await propertyService.update(data.id, updatedProperty);
                property.image = data.image;

                rechargeFunctionProperty?.(property);

                showToast('Successfully', 'Property successfully updated');
                onDone?.();
            } catch (error) {
                showToast('Error', 'An error occurred while saving: ' + error, 'destructive');
            }
        },
        [isNew, data, propertyService, router, rechargeFunctionProperty, onDone, showToast]
    );

    const handleDelete = useCallback(async (): Promise<number | void> => {
        try {
            if (!data) return;

            const { status } = await propertyService.delete(data.id);

            if (status === 200) {
                showToast('Successfully', 'Property successfully deleted');
            } else {
                showToast('Error', 'Error deleting property', 'destructive');
            }

            return status;
        } catch (error) {
            console.error('Error deleting data:', error);
            showToast('Error', 'Error: ' + error, 'destructive');
        }
    }, [data, propertyService, showToast]);

    return {
        handleSubmit,
        handleDelete,
        router,
    };
};
