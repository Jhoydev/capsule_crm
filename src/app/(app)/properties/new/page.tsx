import { CreatePropertyForm } from "@/components/property/forms/CreatePropertyForm";
import { useCreateProperty } from "@/hooks/property/useCreateProperty";

export default function NewPropertyPage() {
    const { form, onSubmit } = useCreateProperty();

    return (
        <div className="max-w-xl mx-auto p-6">
            <h2 className="text-xl font-bold mb-4">Nueva propiedad</h2>
            <CreatePropertyForm form={form} onSubmit={onSubmit} />
        </div>
    );
}
