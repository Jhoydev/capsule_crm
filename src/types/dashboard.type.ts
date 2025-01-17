export type DashboardResponseType = {
    count_property_type: CountPropertyTypeType;
    count_property_status: Partial<CountPropertyStatusType>;
    count_contact_medium: Partial<CountContactMediumType>;
}

export type CountPropertyTypeType = {
    flat: number;
    house: number;
    duplex: number;
    garage: number;
    country_house: number;
    other: number;
}[]

export type CountPropertyStatusType = {
    sold: number;
    rented: number;
    available: number;
    off_market: number;
    pending: number;
}

export type CountContactMediumType = {
    phone: number;
    email: number;
    social_media: number;
    other: number;

}
