'use client'

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getContact, updateContact } from '@/modules/contacts/services/contactApi';
import { Contact } from '@/types/contact.types';
import { FaEdit, FaSave, FaTimes } from 'react-icons/fa';
import Breadcrumbs from "@/components/shared/breadCrumbs";
import { SkeletonCard } from '@/modules/contacts/components/skeleton';
import ContactView from "@/modules/contacts/components/contactView";
import ContactEdition from "@/modules/contacts/components/contactEdition";

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
    if (error || !contact) return <div>Error al cargar contacto</div>;

    return (
        <div className="flex flex-1 w-full h-full">
            {isEditing ? (
                <ContactEdition editFunction={setIsEditing} data={contact} />
            ) : (
                <ContactView editFunction={setIsEditing} data={contact}/>
            )}
        </div>
    );
};

export default ContactDetails;
