'use client'

import PropertyEdition from "@/app/(app)/properties/components/propertyEdition";
import {useState} from "react";
import {Property} from "@/types/property.types";
import Breadcrumbs from "@/components/shared/breadCrumbs";
import {SkeletonCard} from "@/app/(app)/properties/components/skeleton";
import {useAuth} from "@/hooks/auth";
import {Image} from "@/types/image.types";

export default function Create() {
    const {user} = useAuth();
    const [property, setProperty] = useState<Property | null>({
        id: 0,
        reference: '',
        type: "house",
        status: "available",
        contact_id: 0,
        user_id: user.id,
        latitude: 0,
        longitude: 0,
        image: []
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [isEditing, setIsEditing] = useState(true);
    const [formData, setFormData] = useState({
        reference: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    };

    if (loading) {
        return (
            <div>
                <div className='mb-2'>
                    <Breadcrumbs/>
                </div>
                <SkeletonCard/>
            </div>
        );
    }
    if (error || !property) return <div>Error loading property</div>;

    return (
        <div className="flex flex-1 w-full h-full">
            <PropertyEdition editFunction={setIsEditing} data={property} isNew={true}/>
        </div>
    );
}