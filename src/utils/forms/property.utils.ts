import * as z from "zod";
import {propertySchema} from "@/types/propertySchema";
import {Property} from "@/types/property.types";

export type PropertyFormValues = z.infer<typeof propertySchema>;

export const getDefaultValues = (data?: Partial<Property>): PropertyFormValues => ({
    reference: data?.reference ?? "",
    type: data?.type ?? "other",
    title: data?.title ?? "",
    description: data?.description ?? "",
    street: data?.street ?? "",
    street_number: data?.street_number ?? "",
    floor: data?.floor ?? "0",
    door: data?.door ?? "0",
    city: data?.city ?? "",
    state: data?.state ?? "new",
    country_id: data?.country_id ?? "",
    zip_code: data?.zip_code ?? "",
    zone: data?.zone ?? "",
    latitude: data?.latitude ?? 0,
    longitude: data?.longitude ?? 0,
    sale_price: data?.sale_price ?? 0,
    rent_price: data?.rent_price ?? 0,
    transfer_price: data?.transfer_price ?? 0,
    operation: data?.operation ?? "sale",
    constructed_area: data?.constructed_area ?? 0,
    usable_area: data?.usable_area ?? 0,
    plot_area: data?.plot_area ?? 0,
    terrace_area: data?.terrace_area ?? 0,
    bedrooms: data?.bedrooms ?? 0,
    bathrooms: data?.bathrooms ?? 0,
    toilets: data?.toilets ?? 0,
    garage_spaces: data?.garage_spaces ?? 0,
    is_available: data?.is_available ?? false,
    status: data?.status ?? "available",
    contact_id: data?.contact_id ?? 0,
    user_id: data?.user_id ?? 0,
});