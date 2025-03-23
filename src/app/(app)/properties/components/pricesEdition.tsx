import React from 'react';
import {useFormContext, Controller} from 'react-hook-form';
import {FormCurrencyInput} from '@/components/molecules/form/FormCurrencyInput';
import {FormSelect} from '@/components/molecules/form/FormSelect';
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";

const PricesEdition: React.FC = () => {
    const {register, control} = useFormContext();

    return (
        <Card>
            <CardHeader>
                <CardTitle>Prices and Status</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                <Controller
                    name="status"
                    control={control}
                    render={({field}) => (
                        <FormSelect
                            id="status"
                            label="Status"
                            options={[
                                {label: "Sold", value: "sold"},
                                {label: "Rented", value: "rented"},
                                {label: "Available", value: "available"},
                                {label: "Off Market", value: "off_market"},
                                {label: "Pending", value: "pending"},
                            ]}
                            value={field.value}
                            onChange={field.onChange}
                        />
                    )}
                />
                <Controller
                    name="operation"
                    control={control}
                    render={({field}) => (
                        <FormSelect
                            id="operation"
                            label="Operation"
                            options={[
                                {label: "Sale", value: "sale"},
                                {label: "Rent", value: "rent"},
                                {label: "Transfer", value: "transfer"},
                            ]}
                            value={field.value}
                            onChange={field.onChange}
                        />
                    )}
                />
                <FormCurrencyInput id="sale_price" label="Sale price" register={register("sale_price", {valueAsNumber: true})}/>
                <FormCurrencyInput id="rent_price" label="Rent price" register={register("rent_price", {valueAsNumber: true})}/>
                <FormCurrencyInput id="transfer_price" label="Transfer price" register={register("transfer_price", {valueAsNumber: true})}/>
            </CardContent>
        </Card>
    );
};

export default PricesEdition;
