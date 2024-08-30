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

const PropertyComponent = () => {
    const { id } = useParams();
    const [property, setProperty] = useState<Property | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        reference: '',
        city: '',
        state: '',
        country_id: '',
        is_available: true,
        status: ''
    });

    useEffect(() => {
        const fetchProperty= async () => {
            if (id) {
                try {
                    const data: Property = await getProperty(Number(id));
                    setProperty(data);
                    setFormData({
                        reference: data.reference,
                        city: data.city,
                        state: data.state,
                        country_id: data.country_id,
                        is_available: data.is_available,
                        status: data.status
                    });
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

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSave = async (id: number) => {
        try {
            const response = await updateProperty(id, formData as Property);
            setProperty(response.property);
            setIsEditing(false);
        } catch (error) {
            console.error('Error saving data:', error);
            setError(true);
        }
    };

    if (loading) {
        return (
            <div>
                <div className='mb-2'>
                    <Breadcrumbs />
                </div>
                <SkeletonCard />
            </div>
        );
    }
    if (error || !property) return <div>Error al cargar propiedad</div>;

    return (
        <div className="flex flex-1 w-full h-full">
            {isEditing ? (
                <PropertyEdition editFunction={setIsEditing} data={property} />
            ) : (
                <PropertyView editFunction={setIsEditing} data={property}/>
            )}
        </div>
    );
};

export default PropertyComponent;
