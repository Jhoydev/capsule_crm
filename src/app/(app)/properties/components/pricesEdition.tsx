// PricesEdition.tsx
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { RiPriceTag2Line } from "react-icons/ri";
import { IoPricetagOutline } from "react-icons/io5";
import { Input } from '@/components/ui/input';

const PricesEdition: React.FC = () => {
    const { register } = useFormContext();

    return (
        <div className="border p-4 rounded h-full shadow">
            <h3 className="text-sm font-bold mb-6">Prices</h3>
            <div className="flex items-center flex-wrap text-sm">
                <div className="flex flex-col mr-4 mb-5">
                    <label className="mb-2 flex items-center text-slate-500">
                        <RiPriceTag2Line className="mr-1 font-bold"/>
                        Operation:
                    </label>
                    <Input
                        type="text" className="border p-1 rounded w-[100px]" {...register("operation")}
                    />
                </div>
                <div className="flex flex-col mr-4 mb-5">
                    <label className="mb-2 flex items-center text-slate-500">
                        <IoPricetagOutline className="mr-1 font-bold"/>
                        Sale price:
                    </label>
                    <Input
                        type="number" className="border p-1 rounded w-[100px]" {...register("sale_price", { valueAsNumber: true })}
                    />
                </div>
                <div className="flex flex-col mr-4 mb-5">
                    <label className="mb-2 flex items-center text-slate-500">
                        <IoPricetagOutline className="mr-1 font-bold"/>
                        Rent price:
                    </label>
                    <Input
                        type="number" className="border p-1 rounded w-[100px]" {...register("rent_price", { valueAsNumber: true })}
                    />
                </div>
                <div className="flex flex-col mr-4 mb-5">
                    <label className="mb-2 flex items-center text-slate-500">
                        <IoPricetagOutline className="mr-1 font-bold"/>
                        Transfer price:
                    </label>
                    <Input
                        type="number" className="border p-1 rounded w-[100px]" {...register("transfer_price", { valueAsNumber: true })}
                    />
                </div>
            </div>
        </div>
    );
}

export default PricesEdition;
