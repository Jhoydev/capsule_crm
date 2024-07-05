'use client'

import Breadcrumbs from "@/components/shared/breadCrumbs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaEdit, FaSave, FaTimes } from "react-icons/fa";
import TabContact from "@/modules/contacts/components/tab";
import { MdEmail } from "react-icons/md";
import { Contact } from "@/types/contact.types";
import { updateContact } from "@/modules/contacts/services/contactApi";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import {
    Form,
    FormControl, FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

interface ContactEditionProps {
    editFunction: (isEditing: boolean) => void;
    data: Contact;
}

const formSchema = z.object({
    emailAddress: z.string().email({ message: "Email inválido" }),
    firstName: z.string().nonempty({ message: "El nombre no puede estar vacío" }),
    lastName: z.string().nonempty({ message: "Los apellidos no pueden estar vacíos" }),
    nif: z.string().optional(),
    alternateEmail: z.string().optional(),
    phone: z.string().optional(),
    mobile: z.string().optional(),
    avatarUrl: z.string().optional(),
    birthday: z.string().optional(),
    contactMedium: z.string().optional(),
    language: z.string().optional(),
    notes: z.string().optional(),
    rgpd: z.string().optional(),
    profession: z.string().optional(),
    company: z.string().optional(),
    gender: z.string().optional(),
});

const ContactEdition: React.FC<ContactEditionProps> = ({ editFunction, data }) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            emailAddress: data.email || "",
            firstName: data.first_name || "",
            lastName: data.last_name || "",
            nif: data.nif || "",
            alternateEmail: data.alternate_email || "",
            phone: data.phone || "",
            mobile: data.mobile || "",
            avatarUrl: data.avatar_url || "",
            birthday: data.birthday || "",
            contactMedium: data.contact_medium || "",
            language: data.language || "",
            notes: data.notes || "",
            rgpd: data.rgpd || "",
            profession: data.profession || "",
            company: data.company || "",
            gender: data.gender || "",
        },
    });

    useEffect(() => {
        form.reset({
            emailAddress: data.email || "",
            firstName: data.first_name || "",
            lastName: data.last_name || "",
            nif: data.nif || "",
            alternateEmail: data.alternate_email || "",
            phone: data.phone || "",
            mobile: data.mobile || "",
            avatarUrl: data.avatar_url || "",
            birthday: data.birthday || "",
            contactMedium: data.contact_medium || "",
            language: data.language || "",
            notes: data.notes || "",
            rgpd: data.rgpd || "",
            profession: data.profession || "",
            company: data.company || "",
            gender: data.gender || "",
        });
    }, [data, form]);

    const handleSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            console.log({ values });
            setIsEditing(false);
        } catch (error) {
            console.error('Error saving data:', error);
        }
    };

    const setIsEditing = (param: boolean) => {
        editFunction(param);
    };

    const renderFormField = (name: keyof z.infer<typeof formSchema>, label: string, placeholder: string, type: string = "text") => {
        if (type === "textarea") {
            return (
                <div className="mr-5 w-full">
                    <FormField
                        control={form.control}
                        name={name}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{label}</FormLabel>
                                <FormControl>
                                    <Textarea className="w-full" placeholder={placeholder} {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
            );
        } else {
            return (
                <div className="mr-5">
                    <FormField
                        control={form.control}
                        name={name}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{label}</FormLabel>
                                <FormControl>
                                    <Input placeholder={placeholder} type={type} {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
            );
        }
    };


    return (
        <div className="flex flex-col flex-1 w-full">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)}>
                    <div className="flex justify-between items-center mb-5 p-4">
                        <Breadcrumbs/>
                        <div className="flex justify-end items-center">
                            <button
                                onClick={form.handleSubmit(handleSubmit)}
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
                        <div className="grid grid-rows-2 sm:grid-cols-1 md:grid-cols-4 flex-grow">
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
                            </div>
                            <div className="row-span-2 col-span-3 border bg-muted/40 p-5">
                                <div className="grid grid-cols-1 gap-4 overflow-auto h-[calc(100vh-200px)]">
                                    <div className="p-4 bg-white rounded shadow">
                                        <h3 className="font-bold text-blue-600">Datos de Contacto</h3>
                                        <div className="flex flex-wrap min-h-[80px] p-5">
                                            {renderFormField("firstName", "Nombre", "Nombre")}
                                            {renderFormField("lastName", "Apellidos", "Apellidos")}
                                            {renderFormField("emailAddress", "Email address", "Email address", "email")}
                                            {renderFormField("alternateEmail", "Email alternativo", "Email alternativo", "email")}
                                            {renderFormField("phone", "Teléfono", "Teléfono")}
                                            {renderFormField("mobile", "Móvil", "Móvil")}
                                        </div>
                                    </div>
                                    <div className="p-4 bg-white rounded shadow">
                                        <h3 className="font-bold text-blue-600">Información Personal</h3>
                                        <div className="flex flex-wrap min-h-[80px] p-5">
                                            {renderFormField("nif", "NIF", "NIF")}
                                            {renderFormField("avatarUrl", "URL del avatar", "URL del avatar")}
                                            {renderFormField("birthday", "Fecha de Nacimiento", "Fecha de Nacimiento", "date")}
                                            {renderFormField("contactMedium", "Medio de Contacto", "Medio de Contacto")}
                                            {renderFormField("language", "Idioma", "Idioma")}
                                            {renderFormField("gender", "Género", "Género")}
                                        </div>
                                    </div>
                                    <div className="p-4 bg-white rounded shadow">
                                        <h3 className="font-bold text-blue-600">Profesión</h3>
                                        <div className="flex flex-wrap min-h-[80px] p-5">
                                            {renderFormField("profession", "Profesión", "Profesión")}
                                            {renderFormField("company", "Compañía", "Compañía")}
                                        </div>
                                    </div>
                                    <div className="p-4 bg-white rounded shadow">
                                        <h3 className="font-bold text-blue-600">Notas</h3>
                                        <div className="flex flex-wrap min-h-[80px] p-5">
                                            {renderFormField("notes", "Notas", "Notas", "textarea")}
                                        </div>
                                    </div>
                                    <div className="p-4 bg-white rounded shadow">
                                        <h3 className="font-bold text-blue-600">RGPD</h3>
                                        <div className="flex flex-wrap min-h-[80px] p-5">
                                            {renderFormField("rgpd", "RGPD", "RGPD")}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </Form>
            </div>
    );
}

export default ContactEdition;
