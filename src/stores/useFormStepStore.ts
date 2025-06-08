import { create } from 'zustand';

export type FormData = Record<string, any>;

interface FormStepState {
    data: Partial<FormData>;
    currentStep: number;
    setStepData: (stepKey: keyof FormData, newData: any) => void;
    next: () => void;
    back: () => void;
    reset: () => void;
}

export const useFormStepStore = create<FormStepState>((set) => ({
    data: {},
    currentStep: 0,
    setStepData: (stepKey, newData) =>
        set((state) => ({
            data: {
                ...state.data,
                [stepKey]: {
                    ...state.data[stepKey],
                    ...newData,
                },
            },
        })),
    next: () => set((state) => ({ currentStep: state.currentStep + 1 })),
    back: () => set((state) => ({ currentStep: state.currentStep - 1 })),
    reset: () => set({ currentStep: 0, data: {} }),
}));