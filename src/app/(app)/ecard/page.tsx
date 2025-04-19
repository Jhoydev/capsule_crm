'use client';

import { useEffect, useState } from 'react';
import { fetchEcardConfig } from '@/services/ecard.service';
import { EcardPreview } from './components/EcardPreview';
import { EcardEditor } from './components/EcardEditor';
import { EcardToolbar } from './components/EcardToolbar';
import { useAuth } from '@/hooks/auth';
import { getActiveTheme } from '@/app/(app)/ecard/utils/getActiveTheme';
import { EcardConfig } from '@/types/ecard.types';

export default function EcardPage() {
    const { user } = useAuth(); // Asumimos que ya tenés este hook
    const [config, setConfig] = useState<EcardConfig | null>(null);
    const [showEditor, setShowEditor] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user?.id) return;

        const loadConfig = async () => {
            setLoading(true);

            const result = await fetchEcardConfig(user.id);
            const activeTheme = getActiveTheme(result);

            setConfig({
                selectedThemeId: result.selectedThemeId,
                theme: activeTheme,
                customTheme: result.customTheme,
                contentConfig: result.contentConfig,
            });

            setLoading(false);
        };

        void loadConfig();
    }, [user?.id]);

    if (loading || !config) {
        return <p className="text-center p-10">Cargando configuración...</p>;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-start">
            <div className="md:col-span-5">
                <EcardToolbar onShowEditor={() => setShowEditor(true)} config={config} setConfig={setConfig} />
            </div>

            {showEditor && (
                <div className="md:col-span-2">
                    <EcardEditor
                        config={config}
                        setConfig={setConfig as React.Dispatch<React.SetStateAction<EcardConfig>>}
                    />
                </div>
            )}

            <div className={`flex justify-center ${showEditor ? 'md:col-span-3' : 'md:col-span-5'}`}>
                <EcardPreview
                    user={user}
                    config={config}
                    setConfig={setConfig as React.Dispatch<React.SetStateAction<EcardConfig>>}
                />
            </div>
        </div>
    );
}
