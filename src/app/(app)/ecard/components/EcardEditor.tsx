'use client';

import { useEcardConfig } from '@/hooks/useEcardConfig';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export const EcardEditor = ({ configState }: { configState: ReturnType<typeof useEcardConfig> }) => {
    const { config, updateConfig } = configState;

    const handleColorChange = (key: 'textColor' | 'buttonColor', value: string) => {
        updateConfig({
            customTheme: {
                ...config.customTheme,
                [key]: value,
            },
        });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        updateConfig({
            customTheme: {
                ...config.customTheme,
                backgroundImage: value,
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
                    onChange={(e) => handleColorChange('textColor', e.target.value)}
                />
            </div>

            {/* Color del botón */}
            <div className="space-y-1">
                <Label htmlFor="buttonColor">Color del botón</Label>
                <Input
                    id="buttonColor"
                    type="color"
                    value={config.customTheme.buttonColor}
                    onChange={(e) => handleColorChange('buttonColor', e.target.value)}
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
                    onChange={handleImageChange}
                />
            </div>
        </div>
    );
};
