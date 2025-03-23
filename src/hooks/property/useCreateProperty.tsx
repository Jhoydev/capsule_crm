import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { propertySchema } from "@/lib/schemas/property.schema";
import { useRouter } from "next/navigation";
import { createProperty } from "@/services/property.service";
import {PropertyFormValues} from "@/utils/forms/property.utils";

export function useCreateProperty() {
    const router = useRouter();

    const form = useForm<PropertyFormValues>({
        resolver: zodResolver(propertySchema),
        defaultValues: {
            title: "",
            price: 0,
        },
    });

    const onSubmit = async (data: PropertyFormValues) => {
        try {
            await createProperty(data);
            router.push("/dashboard/properties");
        } catch (error) {
            console.error("Error al crear propiedad", error);
        }
    };

    return { form, onSubmit };
}
