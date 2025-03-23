"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PropertyFormValues } from "@/types/property.types";
import { UseFormReturn } from "react-hook-form";

interface Props {
    form: UseFormReturn<PropertyFormValues>;
}

export function PropertyFields({ form }: Props) {
    const { register, formState } = form;

    return (
        <div className="space-y-4">
            <div>
                <Label htmlFor="title">Título</Label>
                <Input id="title" {...register("title")} />
            </div>
            <div>
                <Label htmlFor="price">Precio</Label>
                <Input id="price" type="number" {...register("price")} />
            </div>
        </div>
    );
}