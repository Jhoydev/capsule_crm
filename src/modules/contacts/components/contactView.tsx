'use client'

import Breadcrumbs from "@/components/shared/breadCrumbs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaEdit } from "react-icons/fa";
import TabContact from "@/modules/contacts/components/tab";
import { MdEmail } from "react-icons/md";
import { Contact } from "@/types/contact.types";

interface ContactViewProps {
    editFunction: (isEditing: boolean) => void;
    data: Contact;
}

const ContactView: React.FC<ContactViewProps> = ({ editFunction, data }) => {
    const setIsEditing = (param: boolean) => {
        editFunction(param);
    }

    return (
        <div className="flex flex-col flex-1 w-full h-full">
            <div className="flex justify-between items-center mb-5 p-4">
                <Breadcrumbs/>
                <div className="flex justify-end items-center">
                    <button
                        onClick={() => setIsEditing(true)}
                        className="bg-green-500 text-white px-4 py-2 rounded-md shadow hover:bg-green-600 flex items-center"
                    >
                        <FaEdit className="mr-2"/> Editar
                    </button>
                </div>
            </div>
            <div className="grid grid-rows-2 sm:grid-cols-1 md:grid-cols-4 flex-grow overflow-hidden">
                <div className="row-span-2 col-span-1">
                    <div className='flex h-[250px] justify-center items-center'>
                        <div className='flex'>
                            <Avatar className="h-[80px] w-[80px]">
                                <AvatarImage src={data.avatar_url}/>
                                <AvatarFallback>{data.first_name[0]}{data.last_name[0]}</AvatarFallback>
                            </Avatar>
                            <div className="ml-5">
                                <p className='text-xl font-bold'>{data.first_name} {data.last_name}</p>
                                <p>{data.email}</p>
                                <p>{data.phone}</p>
                            </div>
                        </div>
                    </div>
                    <div className="border-solid border-t hidden md:flex flex-col items-center p-10">
                        <div className='flex flex-col w-full border-l pl-2'>
                            <p className='mt-5 text-sm text-slate-400'>19/06/2024</p>
                            <div className="flex items-center">
                                <MdEmail className="text-2xl mr-5"/>
                                <div className="flex items-center border p-[10px] w-full">
                                    <Avatar className="mr-5">
                                        <AvatarImage src={data.avatar_url}/>
                                        <AvatarFallback>{data.first_name[0]}{data.last_name[0]}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p>Envio de correo al cliente</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-col w-full border-l pl-2'>
                            <p className='mt-5 text-sm text-slate-400'>21/06/2024</p>
                            <div className="flex items-center">
                                <MdEmail className="text-2xl mr-5"/>
                                <div className="flex items-center border p-[10px] w-full">
                                    <Avatar className="mr-5">
                                        <AvatarImage src={data.avatar_url}/>
                                        <AvatarFallback>{data.first_name[0]}{data.last_name[0]}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p>Creada Tarea Visita</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="row-span-2 col-span-3 border bg-muted/40">
                    <TabContact contact={data}/>
                </div>
            </div>

        </div>
    );
}

export default ContactView;
