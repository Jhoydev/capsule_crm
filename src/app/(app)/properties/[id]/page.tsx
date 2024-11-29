'use client'

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getProperty, updateProperty } from '@/app/(app)/properties/services/propertyApi';
import { Property } from '@/types/property.types';
import Breadcrumbs from "@/components/shared/breadCrumbs";
import { SkeletonCard } from '@/app/(app)/properties/components/skeleton';
import PropertyView from "@/app/(app)/properties/components/propertyView";
import PropertyEdition from "@/app/(app)/properties/components/propertyEdition";
import * as z from "zod";
import {handler} from "tailwindcss-animate";

const PropertyComponent = () => {
    const { id } = useParams();
    const [property, setProperty] = useState<Property | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const fetchProperty= async () => {
            if (id) {
                try {
                    const data: Property = await getProperty(Number(id));
                    setProperty(data);
                } catch (error) {
                    console.error('Error fetching data:', error);
                    setError(true);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchProperty();
    }, [id]);

    const handlerRechargeProperty = (property: Property) => {
        setProperty(property);
    }


    if (loading) {
        return (
            <div>
                <div className="p-6">
                    <Breadcrumbs/>
                </div>
                <SkeletonCard/>
            </div>
        );
    }
    if (error || !property) return <div>Error al cargar propiedad</div>;

    return (
        <div className="flex flex-1 w-full h-full">
            {isEditing ? (
                <PropertyEdition editFunction={setIsEditing} rechargeFunctionProperty={handlerRechargeProperty}  data={property} />
            ) : (
                <PropertyView editFunction={setIsEditing} data={property}/>
            )}
        </div>
    );
};

export default PropertyComponent;
