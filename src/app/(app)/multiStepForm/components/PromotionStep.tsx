import { useForm } from 'react-hook-form';
import { useFormStepStore } from '@/stores/useFormStepStore';

interface Form {
    codigoPromocional: string;
}

export default function PromotionStep() {
    const { data, setStepData, next, back } = useFormStepStore();
    const { register, handleSubmit, formState: { errors } } = useForm<Form>({ defaultValues: data.promocion || {} });

    const onSubmit = (values: Form) => {
        setStepData('promocion', values);
        next();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input
                {...register('codigoPromocional', { required: 'El código es requerido' })}
                placeholder="Código promocional"
            />
            {errors.codigoPromocional && <p>{errors.codigoPromocional.message}</p>}
            <div className="flex gap-4">
                <button type="button" onClick={back}>Atrás</button>
                <button type="submit">Siguiente</button>
            </div>
        </form>
    );
}