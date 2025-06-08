import { useFormStepStore } from '@/stores/useFormStepStore';
import { sendFormData } from '@/services/formService';
import { formDataToApiPayload } from '@/hooks/multiStepForm/formDataToApiPayload';

export const useFormSubmit = () => {
    const { data, reset } = useFormStepStore();

    const submit = async () => {
        const payload = formDataToApiPayload(data);
        console.log(data, payload)

        const result = await sendFormData(payload);
        reset();
        return result;
    };

    return { submit };
};