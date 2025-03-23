import React from 'react';
import {useFormContext, Controller} from "react-hook-form";
import {FormInput} from '@/components/molecules/form/FormInput';
import {FormSelect} from '@/components/molecules/form/FormSelect';
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";

const PropertyCharacteristicsEdition = () => {
    const {
        register,
        control,
        formState: {errors}
    } = useFormContext();

    return (
        <Card>
            <CardHeader>
                <CardTitle>Characteristics</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 w-full">
                <FormInput
                    id="reference"
                    label="Reference"
                    register={register("reference")}
                    error={errors.reference}
                />

                <Controller
                    name="state"
                    control={control}
                    render={({field}) => (
                        <FormSelect
                            id="state"
                            label="State"
                            options={[
                                {label: "New", value: "new"},
                                {label: "Under construction", value: "under_construction"},
                                {label: "Reformated", value: "reformated"},
                                {label: "Semi reformated", value: "semi_renovated"},
                                {label: "Second hand", value: "second_hand"},
                                {label: "To renovate", value: "to_renovate"},
                                {label: "Other", value: "other"},
                            ]}
                            value={field.value}
                            onChange={field.onChange}
                        />
                    )}
                />

                <Controller
                    name="type"
                    control={control}
                    render={({field}) => (
                        <FormSelect
                            id="type"
                            label="Type of Property"
                            options={[
                                {label: "Flat", value: "flat"},
                                {label: "House", value: "house"},
                                {label: "Duplex", value: "duplex"},
                                {label: "Room", value: "room"},
                                {label: "Garage", value: "garage"},
                                {label: "Country House", value: "country_house"},
                                {label: "Other", value: "other"},
                            ]}
                            value={field.value}
                            onChange={field.onChange}
                        />
                    )}
                />

                <FormInput id="bedrooms" label="Bedrooms" type="number" register={register("bedrooms")}
                           error={errors.bedrooms}/>
                <FormInput id="bathrooms" label="Bathrooms" type="number" register={register("bathrooms")}
                           error={errors.bathrooms}/>
                <FormInput id="toilets" label="Toilets" type="number" register={register("toilets")}
                           error={errors.toilets}/>
                <FormInput id="garage_spaces" label="Garage Spaces" type="number" register={register("garage_spaces")}
                           error={errors.garage_spaces}/>
                <FormInput id="constructed_area" label="Constructed Area (m²)" type="number"
                           register={register("constructed_area")} error={errors.constructed_area}/>
                <FormInput id="usable_area" label="Usable Area (m²)" type="number" register={register("usable_area")}
                           error={errors.usable_area}/>
                <FormInput id="plot_area" label="Plot Area (m²)" type="number" register={register("plot_area")}
                           error={errors.plot_area}/>
                <FormInput id="terrace_area" label="Terrace Area (m²)" type="number" register={register("terrace_area")}
                           error={errors.terrace_area}/>
            </CardContent>
        </Card>
    );
};

export default PropertyCharacteristicsEdition;
