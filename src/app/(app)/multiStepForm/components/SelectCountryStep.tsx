import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useFormStepStore } from '@/stores/useFormStepStore';

interface Form {
    pais: string;
}

export default function SelectCountryStep() {
    const { data, setStepData, next } = useFormStepStore();
    const { register, handleSubmit, formState: { errors } } = useForm<Form>({ defaultValues: data.selectCountry || {} });

    const onSubmit = (values: Form) => {
        setStepData('selectCountry', values);
        next();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-sm mx-auto">
            <Input
                {...register('pais', { required: 'Selecciona un país' })}
                placeholder="País"
                className={errors.pais ? 'border-red-500' : ''}
            />
            {errors.pais && <p className="text-red-500 text-sm">{errors.pais.message}</p>}
            <Button type="submit" className="w-full">Siguiente</Button>
        </form>
    );
}