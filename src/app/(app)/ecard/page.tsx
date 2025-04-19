'use client';

import { EcardToolbar } from './components/EcardToolbar';
import { EcardPreview } from './components/EcardPreview';
import { EcardEditor } from './components/EcardEditor';
import { useAuth } from '@/hooks/auth';
import {useEcardConfig} from "@/hooks/useEcardConfig";
import { useState } from 'react';

export default function EcardPage() {
    const { user } = useAuth();
    const configState = useEcardConfig();
    const [showEditor, setShowEditor] = useState(false);

    return (
        <div className="p-6 space-y-6">
            <EcardToolbar onShowEditor={() => setShowEditor(true)} />
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-start">
                {showEditor && (
                    <div className="md:col-span-2">
                        <EcardEditor configState={configState} />
                    </div>
                )}
                <div className={`flex justify-center ${showEditor ? "md:col-span-3" : "md:col-span-5"}`}>
                    <EcardPreview user={user} configState={configState} />
                </div>
            </div>
        </div>
    );
}
