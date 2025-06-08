import { useFormStepStore } from '@/stores/useFormStepStore';
import { formSteps } from './../data/formSteps';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StepIndicatorProps {
    visibleSteps?: number;
}

export function StepIndicator({ visibleSteps = 4 }: StepIndicatorProps) {
    const { steps, currentStep, goToStep } = useFormStepStore();

    // Calcular el rango de pasos a mostrar
    const half = Math.floor(visibleSteps / 2);
    let start = Math.max(0, currentStep - half);
    let end = Math.min(steps.length, start + visibleSteps);
    if (end - start < visibleSteps) {
        start = Math.max(0, end - visibleSteps);
    }
    const stepsToShow = steps.slice(start, end);

    return (
        <div className="flex items-center justify-center gap-4 sm:gap-6 mb-6">
            {stepsToShow.map((step, idx) => {
                const index = start + idx;
                const isCompleted = index < currentStep;
                const isCurrent = index === currentStep;
                const isUpcoming = index > currentStep;

                return (
                    <div key={step.id} className="flex items-center gap-2">
                        <button
                            type="button"
                            disabled={isUpcoming}
                            onClick={() => !isUpcoming && goToStep(index)}
                            className={cn(
                                'rounded-full border w-8 h-8 flex items-center justify-center shrink-0 text-sm font-medium transition-all focus:outline-none',
                                isCompleted && 'bg-blue-600 text-white border-blue-600 cursor-pointer',
                                isCurrent && 'border-blue-600 text-blue-600 bg-blue-100 cursor-pointer',
                                isUpcoming && 'border-gray-300 text-gray-400 cursor-not-allowed'
                            )}
                        >
                            {isCompleted ? <Check className="w-4 h-4" /> : index + 1}
                        </button>
                        <span
                            className={cn(
                                'text-sm',
                                isCompleted && 'text-black font-semibold',
                                isCurrent && 'text-blue-600 font-semibold',
                                isUpcoming && 'text-gray-400'
                            )}
                        >
                            {step.label}
                        </span>
                        {index < end - 1 && (
                            <div
                                className={cn(
                                    'w-8 sm:w-12 h-px',
                                    isCompleted || isCurrent ? 'bg-blue-600' : 'bg-gray-200'
                                )}
                            />
                        )}
                    </div>
                );
            })}
        </div>
    );
}