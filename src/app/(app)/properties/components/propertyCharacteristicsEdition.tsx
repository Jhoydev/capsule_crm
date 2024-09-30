import React from 'react';
import { useFormContext } from "react-hook-form";
import { Input } from '@/components/ui/input';

const PropertyCharacteristicsEdition = () => {
    const { register } = useFormContext();

    return (
        <div className="border p-4 text-sm rounded-md mb-4 shadow">
            <h3 className="text-sm font-bold mb-6">Property Characteristics</h3>
            <div className="flex items-start flex-wrap">
                <div className="flex flex-col mr-4 mb-5">
                    <label className="mb-2 flex items-center text-slate-500">
                        Reference:
                    </label>
                    <Input
                        type="text"
                        className="border p-1 rounded w-full"
                        {...register("reference")}
                    />
                </div>
                <div className="flex flex-col mr-4 mb-5">
                    <label className="mb-2 flex items-center text-slate-500">
                        Type of Property:
                    </label>
                    <select
                        className="border p-1 rounded w-full"
                        {...register("type")}
                    >
                        <option value="flat">Flat</option>
                        <option value="house">House</option>
                        <option value="duplex">Duplex</option>
                        <option value="room">Room</option>
                        <option value="garage">Garage</option>
                        <option value="country_house">Country House</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                <div className="flex flex-col mr-4 mb-5">
                    <label className="mb-2 flex items-center text-slate-500">
                        Bedrooms:
                    </label>
                    <Input
                        type="number"
                        className="border p-1 rounded"
                        {...register("bedrooms")}
                    />
                </div>
                <div className="flex flex-col mr-4 mb-5">
                    <label className="mb-2 flex items-center text-slate-500">
                        Bathrooms:
                    </label>
                    <Input
                        type="number"
                        className="border p-1 rounded"
                        {...register("bathrooms")}
                    />
                </div>
                <div className="flex flex-col mr-4 mb-5">
                    <label className="mb-2 flex items-center text-slate-500">
                        Toilets:
                    </label>
                    <Input
                        type="number"
                        className="border p-1 rounded"
                        {...register("toilets")}
                    />
                </div>
                <div className="flex flex-col mr-4 mb-5">
                    <label className="mb-2 flex items-center text-slate-500">
                        Garage Spaces:
                    </label>
                    <Input
                        type="number"
                        className="border p-1 rounded"
                        {...register("garage_spaces")}
                    />
                </div>
                <div className="flex flex-col mr-4 mb-5">
                    <label className="mb-2 flex items-center text-slate-500">
                        Constructed Area (m²):
                    </label>
                    <Input
                        type="number"
                        className="border p-1 rounded"
                        {...register("constructed_area")}
                    />
                </div>
                <div className="flex flex-col mr-4 mb-5">
                    <label className="mb-2 flex items-center text-slate-500">
                        Usable Area (m²):
                    </label>
                    <Input
                        type="number"
                        className="border p-1 rounded"
                        {...register("usable_area")}
                    />
                </div>
                <div className="flex flex-col mr-4 mb-5">
                    <label className="mb-2 flex items-center text-slate-500">
                        Plot Area (m²):
                    </label>
                    <Input
                        type="number"
                        className="border p-1 rounded"
                        {...register("plot_area")}
                    />
                </div>
                <div className="flex flex-col mr-4 mb-5">
                    <label className="mb-2 flex items-center text-slate-500">
                        Terrace Area (m²):
                    </label>
                    <Input
                        type="number"
                        className="border p-1 rounded"
                        {...register("terrace_area")}
                    />
                </div>
            </div>
        </div>
    );
}

export default PropertyCharacteristicsEdition;
