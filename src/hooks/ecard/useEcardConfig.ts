import { useState } from 'react';
import { defaultThemes } from '@/app/(app)/ecard/data/defaultThemes';
import { EcardElement, EcardTheme, EcardConfig } from '@/types/ecard.types';

const initialConfig: EcardConfig = {
    selectedThemeId: defaultThemes[0].id,
    customTheme: defaultThemes[0] as EcardTheme,
    title: 'Título de ejemplo',
    subtitle: 'Subtítulo de ejemplo',
    photoUrl: '/default-avatar.png',
    elements: [
        { type: 'button', content: 'Botón de ejemplo', href: '#' },
        { type: 'text', content: 'Texto de ejemplo' },
        { type: 'social', content: 'Redes sociales', href: '#' },
    ],
};

export function useEcardConfig() {
    const [config, setConfig] = useState<EcardConfig>(initialConfig);

    const updateConfig = (updates: Partial<EcardConfig>) => {
        setConfig((prev) => ({ ...prev, ...updates }));
    };

    const addElement = (element: EcardElement) => {
        setConfig((prev) => ({
            ...prev,
            elements: [...prev.elements, element],
        }));
    };

    const resetCustomTheme = () => {
        setConfig((prev) => ({
            ...prev,
            customTheme: initialConfig.customTheme,
        }));
    };

    return {
        config,
        updateConfig,
        addElement,
        resetCustomTheme,
    };
}