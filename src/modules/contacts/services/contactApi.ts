import axios from '@/lib/axios'
import { Contact, ApiResponseContact } from '@/types/contact.types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost/api';

export const getContact = async (id: number): Promise<Contact> => {
    const { data } = await axios.get<Contact>(`${API_BASE_URL}/contacts/${id}`);
    return data;
};

export const updateContact = async (id: number, datos: Contact): Promise<ApiResponseContact> => {
    const { data } = await axios.patch<ApiResponseContact>(`${API_BASE_URL}/contacts/${id}`, datos);
    return data;
};
