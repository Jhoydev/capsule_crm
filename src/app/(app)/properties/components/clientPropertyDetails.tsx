'use client'

import React from 'react';
import {Property} from "@/types/property.types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"



interface PropertyDetailsProps {
    property: Property;
}

const ClientPropertyDetails: React.FC<PropertyDetailsProps> = ({ property }) => {
    return (
        <div>
            <div className="flex items-start p-4 rounded-lg">
                <Avatar className="w-16 h-16 mr-4">
                    <AvatarImage src="https://via.placeholder.com/80" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="flex justify-between flex-wrap text-sm">
                    <div className="flex flex-col mb-4 mr-4">
                        <span className="text-gray-500 font-medium">Full Name:</span>
                        <span className="text-gray-800 font-semibold">John Doe</span>
                    </div>

                    <div className="flex flex-col mb-4 mr-4">
                        <span className="text-gray-500 font-medium">NIF:</span>
                        <span className="text-gray-800 font-semibold">12345678A</span>
                    </div>

                    <div className="flex flex-col mb-4 mr-4">
                        <span className="text-gray-500 font-medium">Email:</span>
                        <span className="text-gray-800 font-semibold">john.doe@example.com</span>
                    </div>

                    <div className="flex flex-col mb-4 mr-4">
                        <span className="text-gray-500 font-medium">Alternate Email:</span>
                        <span className="text-gray-800 font-semibold">john.alt@example.com</span>
                    </div>

                    <div className="flex flex-col mb-4 mr-4">
                        <span className="text-gray-500 font-medium">Phone:</span>
                        <span className="text-gray-800 font-semibold">+1 234 567 890</span>
                    </div>

                    <div className="flex flex-col mb-4 mr-4">
                        <span className="text-gray-500 font-medium">Mobile:</span>
                        <span className="text-gray-800 font-semibold">+1 987 654 321</span>
                    </div>

                    <div className="flex flex-col mb-4 mr-4">
                        <span className="text-gray-500 font-medium">Birthday:</span>
                        <span className="text-gray-800 font-semibold">1985-06-15</span>
                    </div>

                    <div className="flex flex-col mb-4 mr-4">
                        <span className="text-gray-500 font-medium">Preferred Contact Medium:</span>
                        <span className="text-gray-800 font-semibold">Email</span>
                    </div>

                    <div className="flex flex-col mb-4 mr-4">
                        <span className="text-gray-500 font-medium">Language:</span>
                        <span className="text-gray-800 font-semibold">English</span>
                    </div>

                    <div className="flex flex-col mb-4 mr-4">
                        <span className="text-gray-500 font-medium">Notes:</span>
                        <span
                            className="text-gray-800 font-semibold">VIP Client interested in luxury properties.</span>
                    </div>

                    <div className="flex flex-col mb-4 mr-4">
                        <span className="text-gray-500 font-medium">RGPD Consent:</span>
                        <span className="text-gray-800 font-semibold">Agreed</span>
                    </div>

                    <div className="flex flex-col mb-4 mr-4">
                        <span className="text-gray-500 font-medium">Profession:</span>
                        <span className="text-gray-800 font-semibold">Software Engineer</span>
                    </div>

                    <div className="flex flex-col mb-4 mr-4">
                        <span className="text-gray-500 font-medium">Company:</span>
                        <span className="text-gray-800 font-semibold">Tech Solutions Ltd.</span>
                    </div>

                    <div className="flex flex-col mb-4 mr-4">
                        <span className="text-gray-500 font-medium">Gender:</span>
                        <span className="text-gray-800 font-semibold">Male</span>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default ClientPropertyDetails;
