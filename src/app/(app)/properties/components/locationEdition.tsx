import React, { useState } from 'react';
import { useFormContext } from "react-hook-form";
import dynamic from "next/dynamic";
import { FormInput } from '@/components/molecules/form/FormInput';
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";

// Carga dinámica del mapa
const MapDetails = dynamic(() => import('./map/mapDetails'), {
  ssr: false,
});

const LocationDetails: React.FC = () => {
  const {
    register,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext();

  const [search, setSearch] = useState("");

  const handleBlur = () => {
    const values = getValues();
    const street = values.street || "";
    const streetNumber = values.street_number || "";
    const city = values.city || "";

    let constructedAddress = `${street} ${streetNumber}, ${city}`;
    constructedAddress = street === "" && city !== "" ? city : constructedAddress;
    constructedAddress = street === "" && city === "" ? "" : constructedAddress;
    setSearch(constructedAddress);
  };

  const handleCoordinatesChange = (newLat: number, newLon: number) => {
    setValue("latitude", newLat);
    setValue("longitude", newLon);
  };

  const latitude = watch("latitude");
  const longitude = watch("longitude");

  return (
      <Card>
        <CardHeader>
          <CardTitle>Location Details</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <FormInput
                id="city"
                label="City"
                register={register("city")}
                error={errors.city}
                onBlur={handleBlur}
            />
            <FormInput
                id="street"
                label="Street"
                register={register("street")}
                onBlur={handleBlur}
            />
            <FormInput
                id="street_number"
                label="Number"
                register={register("street_number")}
                error={errors.street_number}
                onBlur={handleBlur}
            />
            <FormInput
                id="floor"
                label="Floor"
                register={register("floor")}
                error={errors.floor}
            />
            <FormInput
                id="door"
                label="Door"
                register={register("door")}
                error={errors.door}
            />
            <FormInput
                id="country_id"
                label="Country ID"
                register={register("country_id")}
            />
            <FormInput
                id="zip_code"
                label="Zip Code"
                register={register("zip_code")}
                error={errors.zip_code}
            />
            <FormInput
                id="zone"
                label="Zone"
                register={register("zone")}
                error={errors.zone}
            />
            <FormInput
                id="latitude"
                label="Latitude"
                register={register("latitude")}
                className="hidden"
            />
            <FormInput
                id="longitude"
                label="Longitude"
                register={register("longitude")}
                className="hidden"
            />
          </div>
          <MapDetails
              latitude={latitude}
              longitude={longitude}
              search={search}
              onCoordinatesChange={handleCoordinatesChange}
          />
        </CardContent>
      </Card>
  );
};

export default LocationDetails;
