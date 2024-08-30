import * as z from "zod";

export const propertySchema = z.object({
    reference: z.string().nonempty({ message: "La referencia no puede estar vacía" }),
    type: z.enum(["flat", "house", "duplex", "room", "garage", "country_house", "other"]),
    title: z.string().optional(),
    description: z.string().optional(),
    street: z.string().optional(),
    street_number: z.string().optional(),
    floor: z.string().optional(),
    door: z.string().optional(),
    city: z.string().nonempty({ message: "La ciudad no puede estar vacía" }),
    state: z.string().nonempty({ message: "El estado no puede estar vacío" }),
    country_id: z.string().nonempty({ message: "El país no puede estar vacío" }),
    zip_code: z.string().optional(),
    zone: z.string().optional(),
    latitude: z.number().optional(),
    longitude: z.number().optional(),
    sale_price: z.number().optional(),
    rent_price: z.number().optional(),
    transfer_price: z.number().optional(),
    operation: z.string().optional(),
    constructed_area: z.number().optional(),
    usable_area: z.number().optional(),
    plot_area: z.number().optional(),
    terrace_area: z.number().optional(),
    bedrooms: z.number().optional(),
    bathrooms: z.number().optional(),
    toilets: z.number().optional(),
    garage_spaces: z.number().optional(),
    is_available: z.boolean(),
    status: z.enum(["sold", "rented", "available", "off_market", "pending"]),
    contact_id: z.number(),
    user_id: z.number(),
});

export type Property = z.infer<typeof propertySchema>;

export const getDefaultValues = (data: Property) => ({
    reference: data.reference || "",
    type: data.type || "other",
    title: data.title || "",
    description: data.description || "",
    street: data.street || "",
    street_number: data.street_number || "",
    floor: data.floor || "",
    door: data.door || "",
    city: data.city || "",
    state: data.state || "",
    country_id: data.country_id || "",
    zip_code: data.zip_code || "",
    zone: data.zone || "",
    latitude: data.latitude || 0,
    longitude: data.longitude || 0,
    sale_price: data.sale_price || 0,
    rent_price: data.rent_price || 0,
    transfer_price: data.transfer_price || 0,
    operation: data.operation || "",
    constructed_area: data.constructed_area || 0,
    usable_area: data.usable_area || 0,
    plot_area: data.plot_area || 0,
    terrace_area: data.terrace_area || 0,
    bedrooms: data.bedrooms || 0,
    bathrooms: data.bathrooms || 0,
    toilets: data.toilets || 0,
    garage_spaces: data.garage_spaces || 0,
    is_available: data.is_available || false,
    status: data.status || "pending",
    contact_id: data.contact_id || 0,
    user_id: data.user_id || 0,
});

export type ApiResponseProperty = {
    message: string;
    property: Property;
    status: number;
};