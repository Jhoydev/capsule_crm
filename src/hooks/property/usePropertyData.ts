import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Property } from "@/types/property.types";
import { PropertyService } from "@/services/property.service";

export const usePropertyData = () => {
    const { id } = useParams();
    const [property, setProperty] = useState<Property | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (!id) return;

        const fetchProperty = async () => {
            try {
                const propertyService = new PropertyService();
                const data: Property = await propertyService.getProperty(Number(id));
                data.is_available = !!data.is_available;
                setProperty(data);
            } catch (error) {
                console.error("Error fetching property:", error);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchProperty();
    }, [id]);

    return { property, setProperty, loading, error };
};