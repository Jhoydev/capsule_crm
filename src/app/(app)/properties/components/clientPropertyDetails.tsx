'use client'

import React, {useEffect, useState} from 'react';
import {Property} from "@/types/property.types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {ContactService} from "@/services/contact.service";
import {Contact} from "@/types/contact.types";



interface PropertyDetailsProps {
    property: Property;
}

const ClientPropertyDetails: React.FC<PropertyDetailsProps> = ({ property }) => {
    const contactId = property.contact_id;
    const [contact, setContact] = useState<Contact | null>(null);
    const [fullName, setFullName] = useState('');
    const [contactMedium, setContactMedium] = useState('');
    const [iniciales, setIniciales] = useState('');
    useEffect(() => {
        const fetchClient= async () => {
            if (contactId) {
                try {
                    const contactService = new ContactService();
                    const data: Contact = await contactService.getContact(Number(contactId));
                    setContact(data);
                    setFullName(data.first_name + ' ' + data.last_name);
                    if (data.contact_medium) {
                        const contactMedium = data.contact_medium.substring(0,1).toUpperCase()+data.contact_medium.replace("_", " ").substring(1);
                        setContactMedium(contactMedium);
                    }
                    let ini = data.first_name.substring(0,1) + data.last_name.substring(0,1);
                    if (ini.length == 1) ini = data.first_name.substring(0,1) + data.first_name.substring(1,1);
                    setIniciales(ini);

                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            }
        };
        fetchClient();
    }, [contactId]);


    return (
        <div className="md:col-span-5 border rounded shadow p-5">
            <div className="flex">
                {/*<!-- Avatar Section --> */}
                <div className="flex col-span-full md:col-span-1 ml-5 mr-10">
                    <Avatar className="w-20 h-20">
                        <AvatarImage src={contact?.avatar_url ?? ''}/>
                        <AvatarFallback>{iniciales}</AvatarFallback>
                    </Avatar>
                </div>
                <div className="flex flex-col gap-4">
                    {/*<!-- Information Grid -->*/}
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 col-span-full">
                        <div className="flex flex-col">
                            <span className="text-gray-500 font-medium">Full Name:</span>
                            <span className="text-gray-800 font-semibold truncate">{fullName ?? '-'}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-gray-500 font-medium">NIF:</span>
                            <span className="text-gray-800 font-semibold">{contact?.nif ?? '-'}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-gray-500 font-medium">Email:</span>
                            <span className="text-gray-800 font-semibold truncate">{contact?.email ?? '-'}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-gray-500 font-medium">Alternate Email:</span>
                            <span className="text-gray-800 font-semibold truncate">{contact?.alternate_email ?? '-'}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-gray-500 font-medium">Phone:</span>
                            <span className="text-gray-800 font-semibold">{contact?.phone ?? '-'}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-gray-500 font-medium">Mobile:</span>
                            <span className="text-gray-800 font-semibold">{contact?.mobile ?? '-'}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-gray-500 font-medium">Birthday:</span>
                            <span className="text-gray-800 font-semibold">{contact?.birthday ?? '-'}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-gray-500 font-medium">Preferred Contact Medium:</span>
                            <span className="text-gray-800 font-semibold">{contactMedium ?? '-'}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-gray-500 font-medium">Language:</span>
                            <span className="text-gray-800 font-semibold">{contact?.language ?? '-'}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-gray-500 font-medium">RGPD Consent:</span>
                            <span className="text-gray-800 font-semibold">{contact?.rgpd ?? '-'}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-gray-500 font-medium">Profession:</span>
                            <span className="text-gray-800 font-semibold">{contact?.profession ?? '-'}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-gray-500 font-medium">Company:</span>
                            <span className="text-gray-800 font-semibold">{contact?.company ?? '-'}</span>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="flex flex-col md:col-span-1">
                            <span className="text-gray-500 font-medium">Gender:</span>
                            <span className="text-gray-800 font-semibold">{contact?.gender ?? '-'}</span>
                        </div>
                        <div className="flex flex-col md:col-span-3">
                            <span className="text-gray-500 font-medium">Notes:</span>
                            <span className="text-gray-800 font-semibold">{contact?.notes ?? '-'}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ClientPropertyDetails;
