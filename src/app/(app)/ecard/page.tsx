'use client'

import { EcardToolbar } from "./components/EcardToolbar";
import { EcardPreview } from "./components/EcardPreview";
import { EcardEditor } from "./components/EcardEditor";
import {useAuth} from "@/hooks/auth";

export default function EcardPage() {
    const { user } = useAuth();

    return (
        <div className="p-6 space-y-6">
            <EcardToolbar />
            <EcardPreview user={user} />
            <EcardEditor />
        </div>
    );
}