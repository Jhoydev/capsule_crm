import { FormData } from '@/stores/useFormStepStore';

export const sendFormData = async (data: Partial<FormData>) => {
    const response = await fetch('/api/enviar-formulario', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.message || 'Error al enviar el formulario');
    }

    return response.json();
};