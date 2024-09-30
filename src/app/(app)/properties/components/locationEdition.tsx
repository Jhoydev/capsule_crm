import React from 'react';
import { useFormContext } from "react-hook-form";
import dynamic from "next/dynamic";

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
                        <input
                            type="text"
                            className="border p-1 rounded"
                            {...register("street")}
                        />
                    </div>
                    <div className="flex flex-col mr-4 mb-5">
                        <label className="mb-2 flex items-center text-slate-500">
                            Street Number:
                        </label>
                        <input
                            type="text"
                            className="border p-1 rounded"
                            {...register("street_number")}
                        />
                    </div>
                    <div className="flex flex-col mr-4 mb-5">
                        <label className="mb-2 flex items-center text-slate-500">
                            Floor:
                        </label>
                        <input
                            type="text"
                            className="border p-1 rounded"
                            {...register("floor")}
                        />
                    </div>
                    <div className="flex flex-col mr-4 mb-5">
                        <label className="mb-2 flex items-center text-slate-500">
                            Door:
                        </label>
                        <input
                            type="text"
                            className="border p-1 rounded"
                            {...register("door")}
                        />
                    </div>
                    <div className="flex flex-col mr-4 mb-5">
                        <label className="mb-2 flex items-center text-slate-500">
                            City:
                        </label>
                        <input
                            type="text"
                            className="border p-1 rounded"
                            {...register("city")}
                        />
                    </div>
                    <div className="flex flex-col mr-4 mb-5">
                        <label className="mb-2 flex items-center text-slate-500">
                            State:
                        </label>
                        <input
                            type="text"
                            className="border p-1 rounded"
                            {...register("state")}
                        />
                    </div>
                    <div className="flex flex-col mr-4 mb-5">
                        <label className="mb-2 flex items-center text-slate-500">
                            Country ID:
                        </label>
                        <input
                            type="text"
                            className="border p-1 rounded"
                            {...register("country_id")}
                        />
                    </div>
                    <div className="flex flex-col mr-4 mb-5">
                        <label className="mb-2 flex items-center text-slate-500">
                            Zip Code:
                        </label>
                        <input
                            type="text"
                            className="border p-1 rounded"
                            {...register("zip_code")}
                        />
                    </div>
                    <div className="flex flex-col mr-4 mb-5">
                        <label className="mb-2 flex items-center text-slate-500">
                            Zone:
                        </label>
                        <input
                            type="text"
                            className="border p-1 rounded"
                            {...register("zone")}
                        />
                    </div>
                    <div className="flex flex-col mr-4 mb-5">
                        <label className="mb-2 flex items-center text-slate-500">
                            Latitude:
                        </label>
                        <input
                            type="number"
                            className="border p-1 rounded"
                            {...register("latitude")}
                        />
                    </div>
                    <div className="flex flex-col mr-4 mb-5">
                        <label className="mb-2 flex items-center text-slate-500">
                            Longitude:
                        </label>
                        <input
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
