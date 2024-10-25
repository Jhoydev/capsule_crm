import axios from '@/lib/axios'
import { Property, ApiResponseProperty } from '@/types/property.types';


const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost/api';

export const getProperty = async (id: number): Promise<Property> => {
    const { data } = await axios.get<Property>(`${API_BASE_URL}/properties/${id}?includes=image`);
    return data;
};

export const updateProperty = async (id: number, datos: Property): Promise<ApiResponseProperty> => {
    const { data } = await axios.patch<ApiResponseProperty>(`${API_BASE_URL}/properties/${id}`, datos);
    return data;
};
