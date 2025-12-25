import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { propertySchema } from "@/schemas/property.schema";
import { useRouter } from "next/navigation";
import { PropertyService } from "@/services/property.service";
import {getDefaultValues, PropertyFormValues} from "@/utils/forms/property.utils";

export function useCreateProperty() {
    const router = useRouter();
    const propertyService = new PropertyService();

    const form = useForm<PropertyFormValues>({
        resolver: zodResolver(propertySchema),
        defaultValues: getDefaultValues(),
    });

    const onSubmit = async (data: PropertyFormValues) => {
        try {
            // @ts-ignore
            await propertyService.save(data);
            router.push("/dashboard/properties");
        } catch (error) {
            console.error("Error al crear propiedad", error);
        }
    };

    return { form, onSubmit };
}
