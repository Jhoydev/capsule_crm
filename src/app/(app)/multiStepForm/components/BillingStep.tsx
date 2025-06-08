import { useForm } from 'react-hook-form';
import { useFormStepStore } from '@/stores/useFormStepStore';

interface Form {
    direccionFacturacion: string;
}

export default function BillingStep() {
    const { data, setStepData, next, back } = useFormStepStore();
    const { register, handleSubmit, formState: { errors } } = useForm<Form>({ defaultValues: data.billing || {} });

    const onSubmit = (values: Form) => {
        setStepData('billing', values);
        next();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register('direccionFacturacion', { required: 'Dirección requerida' })} placeholder="Dirección de facturación" />
            {errors.direccionFacturacion && <p>{errors.direccionFacturacion.message}</p>}
            <div className="flex gap-4">
                <button type="button" onClick={back}>Atrás</button>
                <button type="submit">Siguiente</button>
            </div>
        </form>
    );
}
