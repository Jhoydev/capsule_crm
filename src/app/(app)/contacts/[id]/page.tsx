'use client'

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import {getContact, updateContact} from '@/lib/api';
import { Contact } from '@/models/Contact';
import { FaEdit, FaSave, FaTimes } from 'react-icons/fa';
import Breadcrumbs from "@/components/shared/breadCrumbs";
import { SkeletonCard } from '@/components/shared/skeleton/skelotonContacto';

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
                    const data = await getContact(Number(id));
                    setContact(data);
                    setFormData({
                        first_name: data.first_name || '',
                        last_name: data.last_name || '',
                        phone: data.phone || '',
                        email: data.email || ''
                    });
                    setLoading(false);
                } catch (error) {
                    console.error('Error fetching data:', error);
                    setError(true);
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
                    <Breadcrumbs/>
                </div>
                <SkeletonCard></SkeletonCard>
            </div>
        );
    }
    if (error || !contact) return <div>Error loading contact details</div>;

    return (
        <div className='flex flex-col'>
            <div className='mb-2'>
                <Breadcrumbs/>
            </div>
            <div className="w-full">
                <div className="flex justify-between items-center mb-4 bg-slate-100 p-4 rounded-md shadow-md">
                    <h1 className="text-2xl font-bold">Contacto {contact.id}</h1>
                    {isEditing ? (
                        <div className="flex space-x-2">
                            <button
                                onClick={() => handleSave(contact.id)}
                                className="bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600 flex items-center"
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
                    ) : (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="bg-green-500 text-white px-4 py-2 rounded-md shadow hover:bg-green-600 flex items-center"
                        >
                            <FaEdit className="mr-2"/> Editar
                        </button>
                    )}
                </div>
                <div className='flex justify-center'>
                    {isEditing ? (
                        <div className='w-1/2'>
                            <div className="mb-4">
                                <label className="block text-gray-700">Nombre:</label>
                                <input
                                    type="text"
                                    name="first_name"
                                    value={formData.first_name}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Apellidos:</label>
                                <input
                                    type="text"
                                    name="last_name"
                                    value={formData.last_name}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Teléfono:</label>
                                <input
                                    type="text"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Email:</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                        </div>

                        ) : (
                        <div>
                            <p className="mb-2"><strong>Nombre:</strong> {contact.first_name}</p>
                            <p className="mb-2"><strong>Apellidos:</strong> {contact.last_name}</p>
                            <p className="mb-2"><strong>Teléfono:</strong> {contact.phone}</p>
                            <p className="mb-2"><strong>Email:</strong> {contact.email}</p>
                        </div>
                    )}
                </div>
        </div>
        </div>
    );
};

export default ContactDetails;
