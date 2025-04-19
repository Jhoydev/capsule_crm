'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { EcardConfig } from '@/types/ecard.types';


type props = {
    config: EcardConfig;
    setConfig: React.Dispatch<React.SetStateAction<EcardConfig>>;
};

export const EcardEditor = ({ config, setConfig }: props) => {
    const updateCustomTheme = (changes: Partial<typeof config.customTheme>) => {
        setConfig({
            ...config,
            customTheme: {
                ...config.customTheme,
                ...changes,
            },
            theme: {
                ...config.theme,
                ...changes,
            },
        });
    };

    return (
        <div className="border rounded-lg p-4 bg-muted/40 shadow-sm space-y-4">
            <h2 className="text-lg font-semibold mb-2">🎨 Editor de Tema</h2>

            {/* Color del texto */}
            <div className="space-y-1">
                <Label htmlFor="textColor">Color del texto</Label>
                <Input
                    id="textColor"
                    type="color"
                    value={config.customTheme.textColor}
                    onChange={(e) => updateCustomTheme({ 'textColor' : e.target.value })}
                />
            </div>

            {/* Color del botón */}
            <div className="space-y-1">
                <Label htmlFor="buttonColor">Color del botón</Label>
                <Input
                    id="buttonColor"
                    type="color"
                    value={config.customTheme.buttonColor}
                    onChange={(e) => updateCustomTheme({ 'buttonColor': e.target.value })}
                />
            </div>

            {/* Imagen de fondo */}
            <div className="space-y-1">
                <Label htmlFor="backgroundImage">URL de fondo</Label>
                <Input
                    id="backgroundImage"
                    type="text"
                    placeholder="https://..."
                    value={config.customTheme.backgroundImage}
                    onChange={ (e) => updateCustomTheme({ 'backgroundImage': e.target.value })}
                />
            </div>
        </div>
    );
};
