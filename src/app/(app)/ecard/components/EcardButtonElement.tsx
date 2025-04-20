import React from 'react';
import { GripVertical, Pencil } from 'lucide-react';

type EcardButtonElementProps = {
    href?: string;
    buttonColor: string;
    text?: string;
};

const EcardButtonElement = ({ href, buttonColor, text }: EcardButtonElementProps) => {
    return (
        <div className="flex items-center justify-between relative">
            <GripVertical className="absolute left-2" size={16} style={{ backgroundColor: buttonColor }} />
            <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-md text-white text-sm inline-block w-full"
                style={{ backgroundColor: buttonColor }}
            >
                {text || 'Botón'}
            </a>
            <Pencil className="absolute right-2" size={16} style={{ backgroundColor: buttonColor }} />
        </div>
    );
};

export default EcardButtonElement;
