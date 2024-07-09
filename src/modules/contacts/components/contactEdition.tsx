'use client'

import Breadcrumbs from "@/components/shared/breadCrumbs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaSave, FaTimes } from "react-icons/fa";
import { Contact } from "@/types/contact.types";
import { updateContact } from "@/modules/contacts/services/contactApi";
import { Input } from "@/components/ui/input";
import { Textarea} from "@/components/ui/textarea";
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
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

interface ContactEditionProps {
    editFunction: (isEditing: boolean) => void;
    data: Contact;
}

const formSchema = z.object({
    first_name: z.string().nonempty({ message: "El nombre no puede estar vacío" }),
    last_name: z.string().nonempty({ message: "Los apellidos no pueden estar vacíos" }),
    email: z.string().email({ message: "Email inválido" }),
    nif: z.string().optional(),
    alternate_email: z.string().optional(),
    phone: z.string().optional(),
    mobile: z.string().optional(),
    avatar_url: z.string().optional(),
    birthday: z.string().optional(),
    contact_medium: z.enum(["email", "phone", "sms", "other"]),
    language: z.string().optional(),
    notes: z.string().optional(),
    rgpd: z.string().optional(),
    profession: z.string().optional(),
    company: z.string().optional(),
    gender: z.enum(["male", "female", "other"]),
});

const ContactEdition: React.FC<ContactEditionProps> = ({ editFunction, data }) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            first_name: data.first_name || "",
            last_name: data.last_name || "",
            nif: data.nif || "",
            email: data.email || "",
            alternate_email: data.alternate_email || "",
            phone: data.phone || "",
            mobile: data.mobile || "",
            avatar_url: data.avatar_url || "",
            birthday: data.birthday || "",
            contact_medium: data.contact_medium || "other",
            language: data.language || "",
            notes: data.notes || "",
            rgpd: data.rgpd || "",
            profession: data.profession || "",
            company: data.company || "",
            gender: data.gender || "other",
        },
    });

    useEffect(() => {
        form.reset({
            first_name: data.first_name || "",
            last_name: data.last_name || "",
            nif: data.nif || "",
            email: data.email || "",
            alternate_email: data.alternate_email || "",
            phone: data.phone || "",
            mobile: data.mobile || "",
            avatar_url: data.avatar_url || "",
            birthday: data.birthday || "",
            contact_medium: data.contact_medium || "other",
            language: data.language || "",
            notes: data.notes || "",
            rgpd: data.rgpd || "",
            profession: data.profession || "",
            company: data.company || "",
            gender: data.gender || "other",
        });
    }, [data, form]);

    const handleSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const updatedContact: Contact = {
                id: data.id,
                user_id: data.user_id,
                first_name: values.first_name,
                last_name: values.last_name,
                nif: values.nif ?? "",
                email: values.email,
                alternate_email: values.alternate_email ?? "",
                phone: values.phone ?? "",
                mobile: values.mobile ?? "",
                avatar_url: values.avatar_url ?? "",
                birthday: values.birthday ?? "",
                contact_medium: values.contact_medium,
                language: values.language ?? "",
                notes: values.notes ?? "",
                rgpd: values.rgpd ?? "",
                profession: values.profession ?? "",
                company: values.company ?? "",
                gender: values.gender,
            };

            await updateContact(data.id, updatedContact);
            setIsEditing(false);
        } catch (error) {
            console.error('Error saving data:', error);
        }
    };

    const setIsEditing = (param: boolean) => {
        editFunction(param);
    };

    const contactMediumOptions = [
        { value: "other", label: "Other" },
        { value: "email", label: "Email" },
        { value: "phone", label: "Phone" },
        { value: "sms", label: "SMS" },
    ];

    const genderOptions = [
        { value: "other", label: "Other" },
        { value: "male", label: "Male" },
    ];

    const renderFormField = (
        name: keyof z.infer<typeof formSchema>,
        label: string,
        placeholder: string,
        type: string = "text",
        options?: { value: string, label: string }[]
    ) => {
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
        } else if (type === "select") {
            return (
                <div className="mr-5">
                    <FormField
                        control={form.control}
                        name={name}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{label}</FormLabel>
                                <FormControl>
                                    <Select {...field}>
                                        <SelectTrigger className="w-[180px]">
                                            <SelectValue placeholder={placeholder} />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>{label}</SelectLabel>
                                                {options?.map(option => (
                                                    <SelectItem key={option.value} value={option.value}>
                                                        {option.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
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
                        <Breadcrumbs />
                        <div className="flex justify-end items-center">
                            <button
                                type="submit"
                                className="bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600 flex items-center mr-2"
                            >
                                <FaSave className="mr-2" /> Guardar
                            </button>
                            <button
                                type="button"
                                onClick={() => setIsEditing(false)}
                                className="bg-gray-500 text-white px-4 py-2 rounded-md shadow hover:bg-gray-600 flex items-center"
                            >
                                <FaTimes className="mr-2" /> Cancelar
                            </button>
                        </div>
                    </div>
                    <div className="grid grid-rows-2 sm:grid-cols-1 md:grid-cols-4 flex-grow">
                        <div className="row-span-2 col-span-1">
                            <div className='flex h-[250px] justify-center items-center'>
                                <div className='flex'>
                                    <Avatar className="h-[80px] w-[80px]">
                                        <AvatarImage src={data.avatar_url} />
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
                                        {renderFormField("first_name", "Nombre", "Nombre")}
                                        {renderFormField("last_name", "Apellidos", "Apellidos")}
                                        {renderFormField("email", "Email address", "Email address", "email")}
                                        {renderFormField("alternate_email", "Email alternativo", "Email alternativo", "email")}
                                        {renderFormField("phone", "Teléfono", "Teléfono")}
                                        {renderFormField("mobile", "Móvil", "Móvil")}
                                    </div>
                                </div>
                                <div className="p-4 bg-white rounded shadow">
                                    <h3 className="font-bold text-blue-600">Información Personal</h3>
                                    <div className="flex flex-wrap min-h-[80px] p-5">
                                        {renderFormField("nif", "NIF", "NIF")}
                                        {renderFormField("avatar_url", "URL del avatar", "URL del avatar")}
                                        {renderFormField("birthday", "Fecha de Nacimiento", "Fecha de Nacimiento", "date")}
                                        {renderFormField("contact_medium", "Medio de Contacto", "Medio de Contacto", "select", contactMediumOptions)}
                                        {renderFormField("language", "Idioma", "Idioma")}
                                        {renderFormField("gender", "Género", "Seleccione el género", "select", genderOptions)}
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
