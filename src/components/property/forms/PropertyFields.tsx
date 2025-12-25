"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UseFormReturn } from "react-hook-form";
import {PropertyFormValues} from "@/utils/forms/property.utils";

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
                <Label htmlFor="sale_price">Precio de venta</Label>
                <Input id="sale_price" type="number" {...register("sale_price")} />
            </div>
        </div>
    );
}