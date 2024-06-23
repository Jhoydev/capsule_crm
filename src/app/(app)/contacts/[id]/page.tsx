'use client'

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import {getContact, updateContact} from '@/modules/contacts/services/contactApi';
import { Contact } from '@/types/contact.types';
import { FaEdit, FaSave, FaTimes } from 'react-icons/fa';
import Breadcrumbs from "@/components/shared/breadCrumbs";
import { SkeletonCard } from '@/modules/contacts/components/skeleton';
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {MdEmail} from "react-icons/md";
import {TabContact} from "@/modules/contacts/components/tab";

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
                    <Breadcrumbs/>
                </div>
                <SkeletonCard></SkeletonCard>
            </div>
        );
    }
    if (error || !contact) return <div>Error loading contact details</div>;

    return (
        <div className='flex flex-col'>
            <div className="w-full">
                {/*<div className='flex justify-center'>*/}
                {/*    {isEditing ? (*/}
                {/*        <div className='w-1/2'>*/}
                {/*            <div className="mb-4">*/}
                {/*                <label className="block text-gray-700">Nombre:</label>*/}
                {/*                <input*/}
                {/*                    type="text"*/}
                {/*                    name="first_name"*/}
                {/*                    value={formData.first_name}*/}
                {/*                    onChange={handleInputChange}*/}
                {/*                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"*/}
                {/*                />*/}
                {/*            </div>*/}
                {/*            <div className="mb-4">*/}
                {/*                <label className="block text-gray-700">Apellidos:</label>*/}
                {/*                <input*/}
                {/*                    type="text"*/}
                {/*                    name="last_name"*/}
                {/*                    value={formData.last_name}*/}
                {/*                    onChange={handleInputChange}*/}
                {/*                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"*/}
                {/*                />*/}
                {/*            </div>*/}
                {/*            <div className="mb-4">*/}
                {/*                <label className="block text-gray-700">Teléfono:</label>*/}
                {/*                <input*/}
                {/*                    type="text"*/}
                {/*                    name="phone"*/}
                {/*                    value={formData.phone}*/}
                {/*                    onChange={handleInputChange}*/}
                {/*                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"*/}
                {/*                />*/}
                {/*            </div>*/}
                {/*            <div className="mb-4">*/}
                {/*                <label className="block text-gray-700">Email:</label>*/}
                {/*                <input*/}
                {/*                    type="email"*/}
                {/*                    name="email"*/}
                {/*                    value={formData.email}*/}
                {/*                    onChange={handleInputChange}*/}
                {/*                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"*/}
                {/*                />*/}
                {/*            </div>*/}
                {/*        </div>*/}

                {/*        ) : (*/}
                {/*        <div>*/}
                {/*            <p className="mb-2"><strong>Nombre:</strong> {contact.first_name}</p>*/}
                {/*            <p className="mb-2"><strong>Apellidos:</strong> {contact.last_name}</p>*/}
                {/*            <p className="mb-2"><strong>Teléfono:</strong> {contact.phone}</p>*/}
                {/*            <p className="mb-2"><strong>Email:</strong> {contact.email}</p>*/}
                {/*        </div>*/}
                {/*    )}*/}
                {/*</div>*/}

                <div className='grid grid-rows-2 grid-cols-4 h-full'>
                    <div className='row-span-1 col-span-1 p-10'>
                        <div className='mb-2'>
                            <Breadcrumbs/>
                        </div>
                        <Avatar className='h-[80px] w-[80px]'>
                            <AvatarImage src="/avatars/01.png"/>
                            <AvatarFallback>OM</AvatarFallback>
                        </Avatar>
                        <div className='ml-5'>
                            <h2>Claudia García</h2>
                            <h3>clauida@gmail.com</h3>
                            <h3>746257852</h3>
                        </div>
                    </div>
                    <div className='row-span-2 col-span-3'>
                        <div className="flex justify-end items-center mb-4 p-4">
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
                                    onClick={() => {
                                        setIsEditing(true);
                                    }}
                                    className="bg-green-500 text-white px-4 py-2 rounded-md shadow hover:bg-green-600 flex items-center"
                                >
                                    <FaEdit className="mr-2"/> Editar
                                </button>
                            )}
                        </div>
                        <TabContact></TabContact>
                    </div>
                    <div className='row-span-1 col-span-1 p-10'>
                        <div className='flex flex-col'>
                            <p>19/06/2024</p>
                            <div className='flex items-center'>
                                <MdEmail className="text-2xl mr-5"/>
                                <div className='flex items-center border p-[10px]'>
                                    <Avatar className='mr-5'>
                                        <AvatarImage src="/avatars/01.png"/>
                                        <AvatarFallback>JA</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p>Envio de correo al cliente</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    );
};

export default ContactDetails;
