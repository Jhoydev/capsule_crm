import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { PropertyService } from "@/services/property.service";
import { Property } from "@/types/property.types";
import { PropertyFormValues } from "@/utils/forms/property.utils";

export const usePropertyHandlers = (
    data: Property | null,
    isNew: boolean | undefined,
    rechargeFunctionProperty?: (propertyData: Property) => void,
    onDone?: () => void
) => {
    const { toast } = useToast();
    const router = useRouter();
    const propertyService = new PropertyService();

    const handleSubmit = async (values: PropertyFormValues): Promise<void> => {
        try {
            if (isNew) {
                const { property } = await propertyService.save(values);
                router.push(`/properties/${property.id}`);
                return;
            }

            if (!data) return;

            const updatedProperty = { id: data.id, ...values };
            const { property } = await propertyService.update(data.id, updatedProperty);
            property.image = data.image;

            if (typeof rechargeFunctionProperty === "function") {
                rechargeFunctionProperty(property);
            }

            toast({
                title: "Successfully",
                description: "Property successfully updated",
            });

            onDone?.();
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "An error occurred while saving: " + error,
            });
        }
    };

    const handleDelete = async (): Promise<number | void> => {
        try {
            if (!data) return;

            const { status } = await propertyService.delete(data.id);

            if (status === 200) {
                toast({
                    title: "Successfully",
                    description: "Property successfully deleted",
                });
            } else {
                toast({
                    variant: "destructive",
                    title: "Error",
                    description: "Error deleting property",
                });
            }

            return status;
        } catch (error) {
            console.error("Error deleting data:", error);
            toast({
                variant: "destructive",
                title: "Error",
                description: "Error: " + error,
            });
        }
    };

    return {
        handleSubmit,
        handleDelete,
        router,
    };
};