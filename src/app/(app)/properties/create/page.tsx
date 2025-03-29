'use client';

import PropertyEdition from "@/app/(app)/properties/components/propertyEdition";
import React, { useState } from "react";
import { Property } from "@/types/property.types";
import { useAuth } from "@/hooks/auth";
import {usePropertyContact} from "@/hooks/property/usePropertyContact";
import {usePropertyHandlers} from "@/hooks/property/usePropertyHandlers";

export default function Create() {
    const { user } = useAuth();
    const [mode, setMode] = useState<'view' | 'edit'>('edit');
    const [property, setProperty] = useState<Property>({
        id: 0,
        reference: '',
        type: "house",
        state: "new",
        status: "available",
        contact_id: 0,
        user_id: user.id,
        latitude: 0,
        longitude: 0,
        image: [],
        floor: '',
        door: ''
    });
    const { handlerRechargeProperty } = usePropertyContact(setProperty);
    const onSuccess = () => setMode('edit');
    const { handleSubmit, handleDelete, isSubmitting } = usePropertyHandlers(
        property,
        true,
        handlerRechargeProperty,
        onSuccess
    );

    return (
        <div className="flex flex-1 w-full h-full p-6 gap-6">
            <PropertyEdition
                mode={mode}
                handleViewMode={setMode}
                isNew={true}
                rechargeFunctionProperty={handlerRechargeProperty}
                data={property}
                handleDelete={handleDelete}
                handleSubmit={handleSubmit}
                isSubmitting={isSubmitting}
            />
        </div>
    );
}
