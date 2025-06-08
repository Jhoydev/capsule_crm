import { FormStep, formSteps } from '@/app/(app)/multiStepForm/data/formSteps';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export type FormData = Record<string, any>;

interface FormStepState {
    data: Partial<FormData>;
    currentStep: number;
    steps: FormStep[];
    setStepData: (stepKey: keyof FormData, newData: any) => void;
    next: () => void;
    back: () => void;
    reset: () => void;
    goToStep: (step: number) => void;
    updateSteps: (extraSteps: FormStep[], insertAfterId?: string) => void;
}

export const useFormStepStore = create<FormStepState>()(
    devtools((set, get) => ({
        data: {},
        currentStep: 0,
        steps: formSteps,
        setStepData: (stepKey, newData) =>
            set(
                (state) => ({
                    data: {
                        ...state.data,
                        [stepKey]: {
                            ...state.data[stepKey],
                            ...newData,
                        },
                    },
                }),
                false,
                'setStepData'
            ),
        next: () => set((state) => ({ currentStep: state.currentStep + 1 }), false, 'next'),
        back: () => set((state) => ({ currentStep: state.currentStep - 1 }), false, 'back'),
        reset: () => set({ currentStep: 0, data: {} }, false, 'reset'),
        goToStep: (step: number) => set({ currentStep: step }, false, 'goToStep'),
        updateSteps: (extraSteps, insertAfterId) => {
            let steps = get().steps.slice();
            if (extraSteps.length && insertAfterId) {
                const idx = steps.findIndex((s) => s.id === insertAfterId);
                if (idx !== -1) {
                    steps.splice(idx + 1, 0, ...extraSteps);
                } else {
                    steps = [...steps, ...extraSteps];
                }
            }
            set({ steps }, false, 'updateSteps');
        },
    }))
);
