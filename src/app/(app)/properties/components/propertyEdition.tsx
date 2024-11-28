'use client'

import Breadcrumbs from "@/components/shared/breadCrumbs";
import {FaEdit, FaSave, FaTimes} from "react-icons/fa";
import { Property, getDefaultValues, propertySchema } from "@/types/property.types";
import { updateProperty } from "@/app/(app)/properties/services/propertyApi";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React, {useCallback, useEffect} from "react";
import GalleryPhotos from "@/app/(app)/properties/components/galleryPhotos";
import AgentEdition from "./agentEdition";
import PricesEdition from "./pricesEdition";
import LocationEdition from "@/app/(app)/properties/components/locationEdition";
import PropertyCharacteristicsEdition from "@/app/(app)/properties/components/propertyCharacteristicsEdition";
import PropertyDescriptionsEdition from "./propertyDescriptionsEdition";
import * as z from "zod";
import {useToast} from "@/hooks/use-toast";
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
import {PropertyService} from "@/services/property.service";
import {uploadedFileType} from "@/types/image-upload.types";

interface PropertyEditionProps {
    editFunction: (isEditing: boolean) => void;
    data: Property;
}

const formSchema = z.object(propertySchema);

const PropertyEdition: React.FC<PropertyEditionProps> = ({ editFunction, data }) => {
    const { toast } = useToast();
    const propertyService = new PropertyService()
    const methods = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: getDefaultValues(data),
    });

    useEffect(() => {
        methods.reset(getDefaultValues(data));
    }, [data, methods]);

    const handleSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            console.log(values); // Verificar que los valores se reciben correctamente

            const { image, ...valuesWithoutPhotos } = values;

            const updatedProperty: Property = {
                id: data.id,
                ...valuesWithoutPhotos,
            };

            const result = await updateProperty(data.id, updatedProperty);
            toast({
                title: "Successfully",
                description: "Property successfully updated",
            });
            setIsEditing(false);
        } catch (error) {
            console.error('Error saving data:', error);
            toast({
                variant: "destructive",
                title: "Error",
                description: "Error"+ error,
            });
        }
    };

    // Función para manejar los errores y mostrarlos en un alert
    const handleErrors = (errors: any) => {
        if (Object.keys(errors).length > 0) {
            let errorMessage = 'Errores en el formulario:\n';
            Object.entries(errors).forEach(([field, error]: any) => {
                errorMessage += `Campo ${field}: ${error.message}\n`;
            });
            alert(errorMessage);  // Muestra los errores en un alert
        }
    };

    const setIsEditing = (param: boolean) => {
        editFunction(param);
    };

    const handleUploadedFiles = useCallback((files: uploadedFileType[]) => {
        console.log(files)
        // Aqui implementar logica despues de subir
    }, [])

    const handleKeyDown = (event: React.KeyboardEvent<HTMLFormElement | HTMLInputElement>) => {
        if (event.key === "Enter") {
            event.preventDefault(); // Evita el submit cuando usamos el boton enter sobre el formulario
        }
    };


    return (
        <div className="flex flex-col flex-1 w-full h-[calc(100vh-80px)]">
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(handleSubmit, handleErrors)} onKeyDown={handleKeyDown}>
                    <div className="flex justify-between items-center mb-5 p-4">
                        <Breadcrumbs />
                        <div className="flex justify-end items-center">
                            <Button type="submit" className="mr-5">
                                <FaSave/>
                                <span className="ml-2">Save</span>
                            </Button>
                            <Button type="submit" variant="outline" className="" onClick={() => setIsEditing(false)}>
                                <FaTimes/>
                                <span className="ml-2">Cancel</span>
                            </Button>
                        </div>
                    </div>
                    <div className="grid grid-rows-4 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 gap-4 p-6 grid-rows-[auto,auto,auto,auto] overflow-auto">
                        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-7 md:col-span-1 gap-4">
                            <div className="md:col-span-5 border p-5 shadow rounded-md">
                                <GalleryPhotos property={data} />
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button className="mt-5" variant="outline">
                                            Upload Photos
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
                                            <ImageUpload
                                                maxFiles={10}
                                                resourceId={data.id}
                                                fileUploaderService={propertyService}
                                                onUploadedFiles={handleUploadedFiles}
                                            />
                                        </div>
                                    </DialogContent>
                                </Dialog>
                            </div>
                            <div className="md:col-span-2 flex flex-col justify-between gap-4">
                                <AgentEdition />
                                <PricesEdition />
                            </div>
                        </div>
                        <div className="w-full mt-4">
                            <LocationEdition />
                        </div>
                        <div>
                            <PropertyCharacteristicsEdition />
                        </div>
                        <div>
                            <PropertyDescriptionsEdition />
                        </div>
                    </div>
                </form>
            </FormProvider>
        </div>
    );
};

export default PropertyEdition;
