'use client'

import Breadcrumbs from "@/components/shared/breadCrumbs";
import { FaSave, FaTimes } from "react-icons/fa";
import { Property, getDefaultValues, propertySchema } from "@/types/property.types";
import { updateProperty } from "@/app/(app)/properties/services/propertyApi";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import GalleryPhotos from "@/app/(app)/properties/components/galleryPhotos";
import AgentEdition from "./agentEdition";
import PricesEdition from "./pricesEdition";
import LocationEdition from "@/app/(app)/properties/components/locationEdition";
import PropertyCharacteristicsEdition from "@/app/(app)/properties/components/propertyCharacteristicsEdition";
import PropertyDescriptionsEdition from "./propertyDescriptionsEdition";
import * as z from "zod";
import {useToast} from "@/hooks/use-toast";

interface PropertyEditionProps {
    editFunction: (isEditing: boolean) => void;
    data: Property;
}

const formSchema = z.object(propertySchema);

const PropertyEdition: React.FC<PropertyEditionProps> = ({ editFunction, data }) => {
    const { toast } = useToast();
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

    return (
        <div className="flex flex-col flex-1 w-full h-[calc(100vh-80px)]">
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(handleSubmit, handleErrors)}>
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
                    <div className="grid grid-rows-4 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 gap-4 p-6 grid-rows-[auto,auto,auto,auto] overflow-auto">
                        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-7 md:col-span-1 gap-4">
                            <div className="md:col-span-5 border p-5 shadow rounded-md">
                                <GalleryPhotos property={data} />
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
