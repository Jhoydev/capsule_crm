import { Controller, useForm } from 'react-hook-form';
import { useFormStepStore } from '@/stores/useFormStepStore';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { promotionStep } from '@/app/(app)/multiStepForm/data/formSteps';


interface Form {
    precio: string;
    tieneCodigo: boolean;
}

export default function PromotionStep() {
    const { data, setStepData, next, back, updateSteps, steps } = useFormStepStore();
    const { register, handleSubmit, control, formState: { errors } } = useForm<Form>({
        defaultValues: data.billing || { precio: '', tieneCodigo: false }
    });


    const onSubmit = (values: Form) => {
        setStepData('billing', values);

        if (values.tieneCodigo && !steps.some(step => step.id === promotionStep.id)) {
            updateSteps([promotionStep], 'billing');
        }

        console.log('Datos de facturación:', values);

        next();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="flex items-center gap-2">
                <label className="text-sm">Precio</label>
                <Input
                    {...register('precio', { required: 'El precio es requerido' })}
                />
            </div>
            <div className="flex items-center gap-2">
                <Controller
                    name="tieneCodigo"
                    control={control}
                    render={({ field }) => (
                        <Checkbox
                            id="tieneCodigo"
                            checked={field.value}
                            onCheckedChange={field.onChange}
                        />
                    )}
                />
                <label htmlFor="tieneCodigo" className="text-sm">
                    Tengo un código promocional
                </label>
            </div>
            <div className="flex gap-4">
                <Button type="button" variant="outline" onClick={back}>Atrás</Button>
                <Button type="submit">Siguiente</Button>
            </div>
        </form>
    );
}