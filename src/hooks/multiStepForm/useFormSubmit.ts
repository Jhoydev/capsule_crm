import { useFormStepStore } from '@/stores/useFormStepStore';
import { sendFormData } from '@/services/formService';

export const useFormSubmit = () => {
    const { data, reset } = useFormStepStore();

    const submit = async (override: Partial<typeof data> = {}) => {
        const finalData = { ...data, ...override };
        const result = await sendFormData(finalData);
        reset();
        return result;
    };

    return { submit };
};
