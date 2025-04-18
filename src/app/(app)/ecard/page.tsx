'use client';

import { EcardToolbar } from './components/EcardToolbar';
import { EcardPreview } from './components/EcardPreview';
import { EcardEditor } from './components/EcardEditor';
import { useAuth } from '@/hooks/auth';
import {useEcardConfig} from "@/hooks/useEcardConfig";

export default function EcardPage() {
    const { user } = useAuth();
    const configState = useEcardConfig();

    return (
        <div className="p-6 space-y-6">
            <EcardToolbar />
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-start">
                <div className="md:col-span-2">
                    <EcardEditor configState={configState} />
                </div>
                <div className="md:col-span-3">
                    <EcardPreview user={user} configState={configState} />
                </div>
            </div>
        </div>
    );
}
