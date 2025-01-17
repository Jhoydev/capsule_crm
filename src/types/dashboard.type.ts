export type DashboardResponseType = {
    count_type: Partial<CountTypeType>;
}

type CountTypeType = {
    flat: number;
    house: number;
    duplex: number;
    garage: number;
    country_house: number;
    other: number;
}
