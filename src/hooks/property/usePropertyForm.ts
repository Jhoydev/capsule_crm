import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { propertySchema } from "@/schemas/property.schema";
import { getDefaultValues, PropertyFormValues } from "@/utils/forms/property.utils";
import { Property } from "@/types/property.types";

export const usePropertyForm = (data: Property) => {
    const methods = useForm<PropertyFormValues>({
        resolver: zodResolver(propertySchema),
        defaultValues: getDefaultValues(data),
    });

    const { watch, setValue, reset } = methods;

    useEffect(() => {
        reset(getDefaultValues(data));
    }, [data]);

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "status") {
                setValue("is_available", value.status === "available");
            }
        });
        return () => subscription.unsubscribe();
    }, [watch, setValue]);

    return methods;
};