import * as z from "zod";

export const propertySchema = z.object({
    reference: z.string().nonempty({message: "The reference cannot be empty"}),
    type: z.enum(["flat", "house", "duplex", "room", "garage", "country_house", "other"]),
    title: z.string().min(3).max(100),
    description: z.string().min(5).max(500),
    street: z.string().optional(),
    street_number: z.string().min(1),
    floor: z.string().min(1),
    door: z.string().min(1),
    city: z.string().nonempty({message: "The city cannot be empty"}),
    country_id: z.string().nonempty({message: "The country cannot be empty"}),
    state: z.enum(['under_construction', 'new', 'reformated', 'semi_renovated', 'second_hand', 'to_renovate']),
    zip_code: z.string().min(1),
    zone: z.string().min(3),
    latitude: z.coerce.number().min(-90).max(90, "Invalid latitude"),
    longitude: z.coerce.number().min(-180).max(180, "Invalid longitude"),
    sale_price: z.coerce.number().optional(),
    rent_price: z.coerce.number().optional(),
    transfer_price: z.coerce.number().optional(),
    operation: z.string().optional(),
    constructed_area: z.coerce.number().optional(),
    usable_area: z.coerce.number().optional(),
    plot_area: z.coerce.number().optional(),
    terrace_area: z.coerce.number().optional(),
    bedrooms: z.coerce.number().optional(),
    bathrooms: z.coerce.number().optional(),
    toilets: z.coerce.number().optional(),
    garage_spaces: z.coerce.number().optional(),
    is_available: z.boolean(),
    status: z.enum(["sold", "rented", "available", "off_market", "pending"]),
    contact_id: z.coerce.number({message: 'Owner is required'}).min(1, 'Owner is required'),
    user_id: z.coerce.number().min(1, 'Agent is required'),
});