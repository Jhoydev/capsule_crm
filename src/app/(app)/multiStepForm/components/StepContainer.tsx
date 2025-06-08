import { useFormStepStore } from '@/stores/useFormStepStore';
import { formSteps } from './../data/formSteps';

export default function StepContainer() {
    const { steps, currentStep } = useFormStepStore();
    const Step = steps[currentStep]?.component || (() => <p>Formulario completado.</p>);
    return <Step />;
}