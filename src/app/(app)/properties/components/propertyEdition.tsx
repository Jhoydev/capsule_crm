'use client';

import React, { useState } from 'react';
import { Property } from '@/types/property.types';
import { usePropertyForm } from "@/hooks/property/usePropertyForm";
import { PropertyForm } from "@/app/(app)/properties/components/PropertyForm";
import {PropertyFormValues} from "@/utils/forms/property.utils";

interface PropertyEditionProps {
    mode: 'edit' | 'view';
    handleViewMode: (mode: 'edit' | 'view') => void;
    data: Property;
    rechargeFunctionProperty?: (propertyData: Property) => void;
    isNew?: boolean;
    handleSubmit: (values: PropertyFormValues) => Promise<void>;
    handleDelete: () => Promise<number | void>;
    isSubmitting: boolean;
}

const PropertyEdition: React.FC<PropertyEditionProps> = ({
    handleViewMode,
    data,
    rechargeFunctionProperty,
    isNew,
    handleSubmit,
    handleDelete,
    isSubmitting
}) => {
    const methods = usePropertyForm(data);

    return (
        <PropertyForm
            methods={methods}
            handleSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            data={data}
            handleViewMode={handleViewMode}
            handleDelete={handleDelete}
            rechargeFunctionProperty={rechargeFunctionProperty}
            isNew={isNew}
        />
    );
};

export default PropertyEdition;
