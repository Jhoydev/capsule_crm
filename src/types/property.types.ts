import {Image} from "@/types/image.types";
import {Contact} from "@/types/contact.types";

export type Property = {
    id: number;
    reference: string;
    type: string;
    title?: string;
    description?: string;
    street?: string;
    street_number?: string;
    floor: string;
    door: string;
    city?: string;
    state: string;
    country_id?: string;
    zip_code?: string;
    zone?: string;
    latitude?: number;
    longitude?: number;
    sale_price?: number;
    rent_price?: number;
    transfer_price?: number;
    operation?: string;
    constructed_area?: number;
    usable_area?: number;
    plot_area?: number;
    terrace_area?: number;
    bedrooms?: number;
    bathrooms?: number;
    toilets?: number;
    garage_spaces?: number;
    is_available?: boolean;
    status: string;
    contact_id: number;
    user_id: number;
    image?: Image[];
    contact?: Contact;
};

export type ApiResponseProperty = {
    message: string;
    property: Property;
    status: number;
};

export type ApiResponsePropertyStatus = {
    message: string;
    status: number;
};
