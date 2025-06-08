"use client";

import StepContainer from './components/StepContainer';
import { useFormStepStore } from '@/stores/useFormStepStore';
import { StepIndicator } from '@/app/(app)/multiStepForm/components/StepIndicator';

export default function MultiStepForm() {
    const { currentStep, reset } = useFormStepStore();

    return (
        <div className="max-w-md mx-auto space-y-6 p-4">
            <StepIndicator />
            <StepContainer />
            {currentStep > 0 && (
                <button onClick={reset} className="text-sm text-blue-500 underline">
                    Reiniciar formulario
                </button>
            )}
        </div>
    );
}
