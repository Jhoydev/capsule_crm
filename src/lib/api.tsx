import axios from 'axios';
import { Contact } from '@/models/Contact'
import { Property } from '@/models/Property'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost/api';

export const getContacts = async () : Promise<Contact[]> => {
    try {
        const response = await axios.get<Contact[]>(`${API_BASE_URL}/contacts`);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

export const getProperties = async () : Promise<Property[]> => {
    try {
        const response = await axios.get<Property[]>(`${API_BASE_URL}/properties`);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};
