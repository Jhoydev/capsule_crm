import { useFormStepStore } from '@/stores/useFormStepStore';
import { formSteps } from './../data/formSteps';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export function StepIndicator() {
    const { currentStep } = useFormStepStore();

    return (
        <div className="flex items-center justify-center gap-4 sm:gap-6 mb-6">
            {formSteps.map((step, index) => {
                const isCompleted = index < currentStep;
                const isCurrent = index === currentStep;
                const isUpcoming = index > currentStep;

                return (
                    <div key={step.id} className="flex items-center gap-2">
                        <div
                            className={cn(
                                'rounded-full border w-8 h-8 flex items-center justify-center text-sm font-medium transition-all',
                                isCompleted && 'bg-blue-600 text-white border-blue-600',
                                isCurrent && 'border-blue-600 text-blue-600 bg-blue-100',
                                isUpcoming && 'border-gray-300 text-gray-400'
                            )}
                        >
                            {isCompleted ? <Check className="w-4 h-4" /> : index + 1}
                        </div>
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
                        {index < formSteps.length - 1 && (
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