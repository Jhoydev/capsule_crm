import { useForm } from 'react-hook-form';
import { useFormStepStore } from '@/stores/useFormStepStore';
import { useFormSubmit } from '@/hooks/multiStepForm/useFormSubmit';

interface Form {
    metodoPago: string;
}

export default function PaymentStep() {
    const { setStepData, back } = useFormStepStore();
    const { submit } = useFormSubmit();
    const { register, handleSubmit, formState: { isSubmitting } } = useForm<Form>();

    const onSubmit = async (values: Form) => {
        setStepData('payment', values);
        try {
            await submit({ payment: values });
            alert('Formulario enviado correctamente');
        } catch (err: any) {
            alert(err.message);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register('metodoPago', { required: 'Método de pago requerido' })} placeholder="Método de pago" />
            <div className="flex gap-4">
                <button type="button" onClick={back}>Atrás</button>
                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Enviando...' : 'Pagar'}
                </button>
            </div>
        </form>
    );
}