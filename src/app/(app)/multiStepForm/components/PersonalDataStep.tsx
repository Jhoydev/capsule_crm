import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useFormStepStore } from '@/stores/useFormStepStore';

interface Form {
    nombre: string;
    email: string;
}

export default function PersonalDataStep() {
    const { data, setStepData, next, back } = useFormStepStore();
    const { register, handleSubmit, formState: { errors } } = useForm<Form>({ defaultValues: data.personalData || {} });

    const onSubmit = (values: Form) => {
        setStepData('personalData', values);
        next();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-sm mx-auto">
            <Input
                {...register('nombre', { required: 'Nombre requerido' })}
                placeholder="Nombre"
                className={errors.nombre ? 'border-red-500' : ''}
            />
            {errors.nombre && <p className="text-red-500 text-sm">{errors.nombre.message}</p>}
            <Input
                {...register('email', { required: 'Email requerido' })}
                placeholder="Email"
                className={errors.email ? 'border-red-500' : ''}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            <div className="flex gap-4">
                <Button type="button" variant="outline" onClick={back} className="w-full">Atrás</Button>
                <Button type="submit" className="w-full">Siguiente</Button>
            </div>
        </form>
    );
}