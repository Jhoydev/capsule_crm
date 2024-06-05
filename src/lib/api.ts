import axios from 'axios';
import { PaginatedResponse } from '@/models/PaginatedData';
import { Contact, ApiResponseContact } from '@/models/Contact';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost/api';

export const fetchPaginatedData = async <T>(endpoint: string, pageIndex: number, pageSize: number): Promise<PaginatedResponse<T>> => {
    const { data } = await axios.get<PaginatedResponse<T>>(`${API_BASE_URL}${endpoint}?page=${pageIndex + 1}&perPage=${pageSize}`);
    return data;
};


export const getContact = async (id: number): Promise<Contact> => {
    const { data } = await axios.get<Contact>(`${API_BASE_URL}/contacts/${id}`);
    return data;
};

export const updateContact = async (id: number, datos: Contact): Promise<ApiResponseContact> => {
    const { data } = await axios.patch<ApiResponseContact>(`${API_BASE_URL}/contacts/${id}`, datos);
    return data;
};
