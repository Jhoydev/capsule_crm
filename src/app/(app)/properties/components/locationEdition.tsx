import React from 'react';
import { useFormContext } from "react-hook-form";
import dynamic from "next/dynamic";
import { Input } from '@/components/ui/input';

//Esto es útil para componentes que dependen de objetos o propiedades disponibles solo en el navegador, como window o document, que no existen en el entorno de servidor.
//porl o que con la siguiente intruccion le decimos que cargue el componente mapa de forma dinamica y le indicamos con el ssr false que no lo haga en el lado del servidor.
const MapDetails = dynamic(() => import('./mapDetails'), {
    ssr: false
});

const LocationDetails = () => {
    const { register } = useFormContext();

    return (
        <div className="border p-4 text-sm rounded-md mb-4 shadow">
            <h3 className="text-sm font-bold mb-6">Location Details</h3>
            <div className="flex">
                <div className="flex items-start flex-wrap">

                    <div className="flex flex-col mr-4 mb-5">
                        <label className="mb-2 flex items-center text-slate-500">
                            Street:
                        </label>
                        <Input
                            type="text"
                            className="border p-1 rounded"
                            {...register("street")}
                        />
                    </div>
                    <div className="flex flex-col mr-4 mb-5">
                        <label className="mb-2 flex items-center text-slate-500">
                            Street Number:
                        </label>
                        <Input
                            type="text"
                            className="border p-1 rounded"
                            {...register("street_number")}
                        />
                    </div>
                    <div className="flex flex-col mr-4 mb-5">
                        <label className="mb-2 flex items-center text-slate-500">
                            Floor:
                        </label>
                        <Input
                            type="text"
                            className="border p-1 rounded"
                            {...register("floor")}
                        />
                    </div>
                    <div className="flex flex-col mr-4 mb-5">
                        <label className="mb-2 flex items-center text-slate-500">
                            Door:
                        </label>
                        <Input
                            type="text"
                            className="border p-1 rounded"
                            {...register("door")}
                        />
                    </div>
                    <div className="flex flex-col mr-4 mb-5">
                        <label className="mb-2 flex items-center text-slate-500">
                            City:
                        </label>
                        <Input
                            type="text"
                            className="border p-1 rounded"
                            {...register("city")}
                        />
                    </div>
                    <div className="flex flex-col mr-4 mb-5">
                        <label className="mb-2 flex items-center text-slate-500">
                            State:
                        </label>
                        <Input
                            type="text"
                            className="border p-1 rounded"
                            {...register("state")}
                        />
                    </div>
                    <div className="flex flex-col mr-4 mb-5">
                        <label className="mb-2 flex items-center text-slate-500">
                            Country ID:
                        </label>
                        <Input
                            type="text"
                            className="border p-1 rounded"
                            {...register("country_id")}
                        />
                    </div>
                    <div className="flex flex-col mr-4 mb-5">
                        <label className="mb-2 flex items-center text-slate-500">
                            Zip Code:
                        </label>
                        <Input
                            type="text"
                            className="border p-1 rounded"
                            {...register("zip_code")}
                        />
                    </div>
                    <div className="flex flex-col mr-4 mb-5">
                        <label className="mb-2 flex items-center text-slate-500">
                            Zone:
                        </label>
                        <Input
                            type="text"
                            className="border p-1 rounded"
                            {...register("zone")}
                        />
                    </div>
                    <div className="flex flex-col mr-4 mb-5">
                        <label className="mb-2 flex items-center text-slate-500">
                            Latitude:
                        </label>
                        <Input
                            type="double"
                            className="border p-1 rounded"
                            {...register("latitude")}
                        />
                    </div>
                    <div className="flex flex-col mr-4 mb-5">
                        <label className="mb-2 flex items-center text-slate-500">
                            Longitude:
                        </label>
                        <Input
                            type="number"
                            className="border p-1 rounded"
                            {...register("longitude")}
                        />
                    </div>
                </div>
                <MapDetails/>
            </div>
        </div>
    );
}

export default LocationDetails;
