'use client';

import { useState } from 'react';
import { useEcardConfig } from '@/hooks/ecard/useEcardConfig';
import { Button } from '@/components/ui/button';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import {
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogFooter,
    AlertDialogCancel,
    AlertDialogAction,
    AlertDialogTitle,
    AlertDialogDescription,
} from '@/components/ui/alert-dialog';
import { defaultThemes } from '@/app/(app)/ecard/data/defaultThemes';
import { EcardConfig, EcardTheme } from '@/types/ecard.types';
import { getActiveTheme } from '@/app/(app)/ecard/utils/getActiveTheme';

type props = {
    config: EcardConfig;
    setConfig: React.Dispatch<React.SetStateAction<any>>;
    onShowEditor: () => void;
};

export const EcardToolbar = ({ config, setConfig, onShowEditor }: props) => {
    const [selectedTheme, setSelectedTheme] = useState(config.theme.id);
    const [confirmOverride, setConfirmOverride] = useState(false);

    const handleThemeChange = (value: string) => {
        setSelectedTheme(value);

        const theme = getActiveTheme({ selectedThemeId: value, customTheme: config.customTheme });

        setConfig({
            ...config,
            selectedThemeId: value,
            theme,
        });
    };

    const handleEditClick = () => {
        if (selectedTheme !== 'custom') {
            setConfirmOverride(true);
        } else {
            onShowEditor();
        }
    };

    const confirmCopyAndEdit = () => {
        setConfig({
            ...config,
            selectedThemeId: 'custom',
            customTheme: config.theme,
            theme: { ...config.theme },
        })

        setConfirmOverride(false);
        setSelectedTheme('custom');
        onShowEditor();
    };

    return (
        <>
            <div className="flex items-center justify-between gap-4 bg-white p-4 border rounded-lg shadow-sm">
                <div className="flex items-center gap-2">
                    <label className="text-sm font-medium">Tema:</label>
                    <Select value={selectedTheme} onValueChange={handleThemeChange}>
                        <SelectTrigger className="w-40">
                            <SelectValue placeholder="Selecciona un tema" />
                        </SelectTrigger>
                        <SelectContent>
                            {defaultThemes.map((theme: EcardTheme) => (
                                <SelectItem key={theme.id} value={theme.id}>
                                    {theme.name}
                                </SelectItem>
                            ))}
                            <SelectItem value="custom">Personalizado</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <Button variant="outline" onClick={handleEditClick}>
                    Editar tema
                </Button>
            </div>

            <AlertDialog open={confirmOverride} onOpenChange={setConfirmOverride}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>¿Sobrescribir tema personalizado?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Esto reemplazará tu tema personalizado actual con una copia del predeterminado. ¿Deseas
                            continuar?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction onClick={confirmCopyAndEdit}>Sí, sobrescribir y editar</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
};
