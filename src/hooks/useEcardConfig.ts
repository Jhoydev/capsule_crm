import { useState } from "react";

export type EcardElement = {
    type: "button" | "text" | "social";
    content: string;
    href?: string;
};

export type EcardTheme = {
    textColor: string;
    buttonColor: string;
    backgroundImage: string;
};

export type EcardConfig = {
    theme: "default" | "custom";
    customTheme: EcardTheme;
    title: string;
    subtitle: string;
    photoUrl: string;
    elements: EcardElement[];
};

const initialConfig: EcardConfig = {
    theme: "default",
    customTheme: {
        textColor: "#000000",
        buttonColor: "#1E40AF",
        backgroundImage: "",
    },
    title: "Título de ejemplo",
    subtitle: "Subtítulo de ejemplo",
    photoUrl: "/default-avatar.png",
    elements: [],
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