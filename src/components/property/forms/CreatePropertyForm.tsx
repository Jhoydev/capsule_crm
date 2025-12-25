"use client";

import { Button } from "@/components/ui/button";
import { PropertyFields } from "./PropertyFields";
import { UseFormReturn } from "react-hook-form";
import {PropertyFormValues} from "@/utils/forms/property.utils";

interface Props {
    form: UseFormReturn<any>;
    onSubmit: (data: PropertyFormValues) => void;
}

export function CreatePropertyForm({ form, onSubmit }: Props) {
    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <PropertyFields form={form} />
            <Button type="submit" disabled={form.formState.isSubmitting}>
                Crear propiedad
            </Button>
        </form>
    );
}
