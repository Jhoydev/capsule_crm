import { useFormStepStore } from '@/stores/useFormStepStore';
import { formSteps } from './../data/formSteps';

export default function StepContainer() {
    const { currentStep } = useFormStepStore();
    const Step = formSteps[currentStep]?.component || (() => <p>Formulario completado.</p>);
    return <Step />;
}