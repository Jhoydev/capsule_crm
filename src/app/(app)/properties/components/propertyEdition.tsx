'use client';

import React, { useState } from 'react';
import { Property } from '@/types/property.types';
import { propertySchema } from '@/schemas/property.schema';
import { usePropertyForm } from "@/hooks/property/usePropertyForm";
import { PropertyForm } from "@/app/(app)/properties/components/PropertyForm";
import {PropertyFormValues} from "@/utils/forms/property.utils";

interface PropertyEditionProps {
    mode: 'edit' | 'view';
    editFunction: (mode: 'edit' | 'view') => void;
    data: Property;
    rechargeFunctionProperty?: (propertyData: Property) => void;
    isNew?: boolean;
    handleSubmit: (values: PropertyFormValues) => Promise<void>;
    handleDelete: () => Promise<void>;
}

const formSchema = propertySchema;

const PropertyEdition: React.FC<PropertyEditionProps> = ({
    editFunction,
    data,
    rechargeFunctionProperty,
    isNew,
    handleSubmit,
    handleDelete
}) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const methods = usePropertyForm(data);

    const setIsEditing = (mode: PropertyEditionProps["mode"]) => {
        editFunction(mode);
    };

    return (
        <PropertyForm
            methods={methods}
            handleSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            data={data}
            setIsEditing={setIsEditing}
            handleDelete={handleDelete}
            rechargeFunctionProperty={rechargeFunctionProperty}
            isNew={isNew}
        />
    );
};

export default PropertyEdition;
