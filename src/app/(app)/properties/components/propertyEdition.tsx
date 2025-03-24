'use client';

import React, {useState} from 'react';
import {Property} from '@/types/property.types';
import {propertySchema} from '@/schemas/property.schema';
import {usePropertyForm} from "@/hooks/property/usePropertyForm";
import {PropertyForm} from "@/app/(app)/properties/components/PropertyForm";
import {usePropertyHandlers} from "@/hooks/property/usePropertyHandlers";

interface PropertyEditionProps {
    mode: 'edit' | 'view';
    editFunction: (mode: 'edit' | 'view') => void;
    data: Property;
    rechargeFunctionProperty?: (propertyData: Property) => void;
    isNew?: boolean;
    handleDelete: () => Promise<any>;
}

const formSchema = propertySchema;

const PropertyEdition: React.FC<PropertyEditionProps> = ({
                                                             editFunction,
                                                             data,
                                                             rechargeFunctionProperty,
                                                             isNew,
                                                             handleDelete
                                                         }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const methods = usePropertyForm(data);

    const setIsEditing = (mode: PropertyEditionProps["mode"]) => {
        editFunction(mode);
    };

    const {handleSubmit, router} = usePropertyHandlers(
        data,
        isNew,
        rechargeFunctionProperty,
        () => setIsEditing('view')
    );

    return (
        <div className="flex flex-col flex-1 w-full">
            <PropertyForm
                methods={methods}
                handleSubmit={handleSubmit}
                isSubmitting={isSubmitting}
                data={data}
                setIsEditing={setIsEditing}
                handleDelete={handleDelete}
                router={router}
                rechargeFunctionProperty={rechargeFunctionProperty}
                isNew={isNew}
            />
        </div>
    );
};

export default PropertyEdition;
