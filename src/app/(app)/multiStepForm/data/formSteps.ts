import SelectCountryStep from './../components/SelectCountryStep';
import PersonalDataStep from './../components/PersonalDataStep';
import CompanyStep from './../components/CompanyStep';
import BillingStep from './../components/BillingStep';
import PaymentStep from './../components/PaymentStep';
import React from 'react';
import PromotionStep from '@/app/(app)/multiStepForm/components/PromotionStep';

export type StepKey =
    | 'selectCountry'
    | 'personalData'
    | 'company'
    | 'billing'
    | 'promotion'
    | 'payment';

export interface FormStep {
    id: StepKey;
    label: string;
    component: React.ComponentType;
}

export const formSteps: FormStep[] = [
    {
        id: 'selectCountry',
        label: 'Seleccionar país',
        component: SelectCountryStep,
    },
    {
        id: 'personalData',
        label: 'Datos personales',
        component: PersonalDataStep,
    },
    {
        id: 'company',
        label: 'Datos empresa',
        component: CompanyStep,
    },
    {
        id: 'billing',
        label: 'Facturación',
        component: BillingStep,
    },
    {
        id: 'payment',
        label: 'Pago',
        component: PaymentStep,
    },
];

export const promotionStep: FormStep = {
    id: 'promotion',
    label: 'promotion',
    component: PromotionStep,
};