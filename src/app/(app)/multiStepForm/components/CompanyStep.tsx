import { useForm } from 'react-hook-form';
import { useFormStepStore } from '@/stores/useFormStepStore';

interface Form {
    nombreEmpresa: string;
    cif: string;
}

export default function CompanyStep() {
    const { data, setStepData, next, back } = useFormStepStore();
    const { register, handleSubmit, formState: { errors } } = useForm<Form>({ defaultValues: data.company || {} });

    const onSubmit = (values: Form) => {
        setStepData('company', values);
        next();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register('nombreEmpresa', { required: 'Nombre de empresa requerido' })} placeholder="Nombre de empresa" />
            {errors.nombreEmpresa && <p>{errors.nombreEmpresa.message}</p>}
            <input {...register('cif', { required: 'CIF requerido' })} placeholder="CIF" />
            {errors.cif && <p>{errors.cif.message}</p>}
            <div className="flex gap-4">
                <button type="button" onClick={back}>Atrás</button>
                <button type="submit">Siguiente</button>
            </div>
        </form>
    );
}