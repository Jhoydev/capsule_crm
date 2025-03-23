"use client";

import { Button } from "@/components/ui/button";
import { PropertyFields } from "./PropertyFields";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { propertySchema } from "@/lib/schemas/property.schema";
import {PropertyFormValues} from "@/utils/forms/property.utils";

interface Props {
    onSubmit: (data: PropertyFormValues) => void;
    defaultValues?: Partial<PropertyFormValues>;
}

export function CreatePropertyForm({ onSubmit, defaultValues }: Props) {
    const form = useForm<PropertyFormValues>({
        resolver: zodResolver(propertySchema),
        defaultValues: defaultValues || { title: "", price: 0 },
    });

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <PropertyFields form={form} />
            <Button type="submit" disabled={form.formState.isSubmitting}>
                Crear propiedad
            </Button>
        </form>
    );
}
