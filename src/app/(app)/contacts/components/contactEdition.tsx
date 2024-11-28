'use client'

import Breadcrumbs from "@/components/shared/breadCrumbs";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {FaSave, FaTimes} from "react-icons/fa";
import {Contact, getDefaultValues, contactSchema} from "@/types/contact.types";
import {updateContact} from "@/app/(app)/contacts/services/contactApi";
import {useForm, FormProvider, useFormContext} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import React, {useEffect} from "react";
import {renderField} from "@/lib/renderFormField";
import {Form} from "@/components/ui/form";
import * as z from "zod";
import {Toaster} from "@/components/ui/toaster"
import {useToast} from "@/hooks/use-toast";
import {ContactService} from "@/services/contact.service";
import {useAuth} from "@/hooks/auth";
import {useRouter} from "next/navigation";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import ImageUpload from "@/components/ImageUpload";

interface ContactEditionProps {
    editFunction: (isEditing: boolean) => void;
    data: Contact;
    isNew?: boolean;
}

const formSchema = z.object(contactSchema);

const ContactEdition: React.FC<ContactEditionProps> = ({editFunction, data, isNew = false}) => {
    const {toast} = useToast();
    const router = useRouter();
    const contactService = new ContactService();

    const methods = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: getDefaultValues(data),
    });

    useEffect(() => {
        methods.reset(getDefaultValues(data));
    }, [data, methods]);

    const handleSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const updatedContact: Contact = {
                id: data.id,
                user_id: data.user_id,
                ...values,
            };

            if (isNew) {
                const {id, ...updatedContactWithoutId} = updatedContact;
                const contactService = new ContactService();
                const {contact} = await contactService.save(updatedContactWithoutId)

                router.push(`/contacts/${contact.id}`);

                return;
            } else {
                await updateContact(data.id, updatedContact);
            }

            toast({
                title: "Successfully",
                description: "Contact successfully updated",
            });
            setIsEditing(false);
        } catch (error) {
            console.error('Error saving data:', error);
            toast({
                variant: "destructive",
                title: "Error",
                description: "Error" + error,
            });
        }
    };

    const setIsEditing = (param: boolean) => {
        editFunction(param);
    };

    const contactMediumOptions = [
        {value: "other", label: "Otro"},
        {value: "email", label: "Email"},
        {value: "phone", label: "Teléfono"},
        {value: "sms", label: "SMS"},
    ];

    const genderOptions = [
        {value: "other", label: "Otro"},
        {value: "male", label: "Masculino"},
        {value: "female", label: "Femenino"},
    ];

    const languageOptions = [
        {value: "english", label: "English"},
        {value: "spanish", label: "Spanish"},
        {value: "french", label: "French"},
        {value: "other", label: "Other"},
    ];

    const renderFormField = (
        name: keyof z.infer<typeof formSchema>,
        label: string,
        placeholder: string,
        type: string = "text",
        options?: { value: string, label: string }[]
    ) => {
        const {control} = methods;
        return renderField({name, label, placeholder, type, options, control});
    };

    return (
        <div className="flex flex-col flex-1 w-full">
            <FormProvider {...methods}>
                <Form {...methods}>
                    <form onSubmit={methods.handleSubmit(handleSubmit)}>
                        <div className="flex justify-between items-center mb-5 p-4">
                            <Breadcrumbs/>
                            <div className="flex justify-end items-center">
                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600 flex items-center mr-2"
                                >
                                    <FaSave className="mr-2"/> Guardar
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setIsEditing(false)}
                                    className="bg-gray-500 text-white px-4 py-2 rounded-md shadow hover:bg-gray-600 flex items-center"
                                >
                                    <FaTimes className="mr-2"/> Cancelar
                                </button>
                            </div>
                        </div>
                        <div className="grid grid-rows-2 sm:grid-cols-1 md:grid-cols-4 flex-grow">
                            <div className="row-span-2 col-span-1">
                                <div className='flex flex-col gap-5 h-[250px] justify-center items-center'>
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
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button className="rounded-full shadow" variant="outline">
                                                Upload Avatar
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent className="sm:max-w-[425px]">
                                            <DialogHeader>
                                                <DialogTitle className="text-center">
                                                    Upload your files
                                                </DialogTitle>
                                                <DialogDescription className="text-center">
                                                    The only file upload you will ever need
                                                </DialogDescription>
                                            </DialogHeader>
                                            <div className="grid gap-4 py-4">
                                                <ImageUpload resourceId={data.id} fileUploaderService={contactService}/>
                                            </div>
                                        </DialogContent>
                                    </Dialog>
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
                                            {renderFormField("language", "Idioma", "Idioma", "select", languageOptions)}
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
            </FormProvider>
        </div>
    );
}

export default ContactEdition;
