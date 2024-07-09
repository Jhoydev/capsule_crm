import axios from '@/lib/axios'
import { Contact, ApiResponseContact } from '@/types/contact.types';
import { fetchPaginatedData } from '@/services/paginationApi';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost/api';

export const getAll = (pagination: { pageIndex: number, pageSize: number }) => {
    return fetchPaginatedData<Contact>('contacts', pagination.pageIndex, pagination.pageSize);
}

export const getContact = async (id: number): Promise<Contact> => {
    const { data } = await axios.get<Contact>(`${API_BASE_URL}/contacts/${id}`);
    return data;
};

export const updateContact = async (id: number, datos: Contact): Promise<ApiResponseContact> => {
    const { data } = await axios.patch<ApiResponseContact>(`${API_BASE_URL}/contacts/${id}`, datos);
    return data;
};
