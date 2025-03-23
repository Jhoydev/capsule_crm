import React from 'react';
import { useFormContext } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormInput } from "@/components/molecules/form/FormInput";
import { FormTextarea } from "@/components/molecules/form/FormTextarea";

const PropertyDescriptionsEdition = () => {
  const {
    register,
    formState: { errors }
  } = useFormContext();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Property Descriptions</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 gap-4">
        <FormInput
          id="title"
          label="Title"
          register={register("title")}
          error={errors.title}
        />
        <FormTextarea
          id="description"
          label="Description"
          register={register("description")}
          error={errors.description}
          rows={5}
        />
      </CardContent>
    </Card>
  );
}

export default PropertyDescriptionsEdition;
