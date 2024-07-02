'use client'

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getContact, updateContact } from '@/modules/contacts/services/contactApi';
import { Contact } from '@/types/contact.types';
import { FaEdit, FaSave, FaTimes } from 'react-icons/fa';
import Breadcrumbs from "@/components/shared/breadCrumbs";
import { SkeletonCard } from '@/modules/contacts/components/skeleton';
import ContactView from "@/modules/contacts/components/contactView";

const ContactDetails = () => {
    const { id } = useParams();
    const [contact, setContact] = useState<Contact | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        phone: '',
        email: ''
    });

    useEffect(() => {
        const fetchContact = async () => {
            if (id) {
                try {
                    const data: Contact = await getContact(Number(id));
                    setContact(data);
                    setFormData({
                        first_name: data.first_name || '',
                        last_name: data.last_name || '',
                        phone: data.phone || '',
                        email: data.email || ''
                    });
                } catch (error) {
                    console.error('Error fetching data:', error);
                    setError(true);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchContact();
    }, [id]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSave = async (id: number) => {
        try {
            const response = await updateContact(id, formData as Contact);
            setContact(response.contact);
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
    if (error || !contact) return <div>Error loading contact details</div>;

    return (
        <div className="flex flex-1 w-full h-full">
            {isEditing ? (
                <div className="flex justify-between items-center mb-5">
                    <Breadcrumbs/>
                    <div className="flex justify-end items-center">
                        <button
                            onClick={() => handleSave(contact.id)}
                            className="bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600 flex items-center mr-2"
                        >
                            <FaSave className="mr-2"/> Guardar
                        </button>
                        <button
                            onClick={() => setIsEditing(false)}
                            className="bg-gray-500 text-white px-4 py-2 rounded-md shadow hover:bg-gray-600 flex items-center"
                        >
                            <FaTimes className="mr-2"/> Cancelar
                        </button>
                    </div>
                </div>
            ) : (
                <ContactView editFunction={setIsEditing} data={contact}/>
            )}
        </div>
    );
};

export default ContactDetails;
