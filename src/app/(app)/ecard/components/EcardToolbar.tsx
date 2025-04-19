'use client';

import { useState } from 'react';
import { useEcardConfig } from '@/hooks/useEcardConfig';
import { Button } from '@/components/ui/button';
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from '@/components/ui/select';
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, AlertDialogCancel, AlertDialogAction, AlertDialogTitle, AlertDialogDescription } from '@/components/ui/alert-dialog';

export const EcardToolbar = ({
                                 onShowEditor,
                             }: {
    onShowEditor: () => void;
}) => {
    const { config, updateConfig } = useEcardConfig();
    const [selectedTheme, setSelectedTheme] = useState(config.theme);
    const [confirmOverride, setConfirmOverride] = useState(false);

    const handleThemeChange = (value: string) => {
        setSelectedTheme(value as 'default' | 'custom');
        updateConfig({ theme: value as 'default' | 'custom' });
    };

    const handleEditClick = () => {
        if (selectedTheme !== 'custom') {
            setConfirmOverride(true);
        } else {
            onShowEditor();
        }
    };

    const confirmCopyAndEdit = () => {
        updateConfig({
            customTheme: { ...config.customTheme },
            theme: 'custom',
        });
        setConfirmOverride(false);
        onShowEditor();
    };

    return (
        <>
            <div className="flex items-center justify-between gap-4 bg-white p-4 border rounded-lg shadow-sm">
                {/* 🔘 Selector de tema */}
                <div className="flex items-center gap-2">
                    <label className="text-sm font-medium">Tema:</label>
                    <Select value={selectedTheme} onValueChange={handleThemeChange}>
                        <SelectTrigger className="w-36">
                            <SelectValue placeholder="Selecciona un tema" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="default">Predeterminado</SelectItem>
                            <SelectItem value="custom">Personalizado</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* 🎨 Botón de edición */}
                <Button variant="outline" onClick={handleEditClick}>
                    Editar tema
                </Button>
            </div>

            {/* ⚠️ Diálogo de confirmación */}
            <AlertDialog open={confirmOverride} onOpenChange={setConfirmOverride}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>¿Sobrescribir tema personalizado?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Esto reemplazará tu tema personalizado actual con una copia del predeterminado.
                            ¿Deseas continuar?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction onClick={confirmCopyAndEdit}>
                            Sí, sobrescribir y editar
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
};