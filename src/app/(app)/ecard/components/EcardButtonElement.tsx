import React from 'react';
import { GripVertical, Pencil } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';

type EcardButtonElementProps = {
    href?: string;
    buttonColor: string;
    text?: string;
    onChange: (updatedElement: { content?: string; href?: string }) => void;
};

const EcardButtonElement = ({ href, buttonColor, text, onChange }: EcardButtonElementProps) => {
    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const updatedText = e.target.value;
        onChange({ content: updatedText, href });
    };

    const handleHrefChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const updatedHref = e.target.value;
        onChange({ content: text, href: updatedHref });
    };

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
            <Popover>
                <PopoverTrigger className="absolute right-2">
                    <Button variant="link" size="icon">
                        <Pencil size={16} />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-100">
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="buttonText">Texto del botón</label>
                            <input
                                type="text"
                                id="buttonText"
                                className="border rounded-md p-2"
                                placeholder="Texto del botón"
                                value={text}
                                onChange={handleTextChange}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="buttonText">URL</label>
                            <input
                                type="text"
                                id="buttonText"
                                className="border rounded-md p-2"
                                placeholder="Texto del botón"
                                value={href}
                                onChange={handleHrefChange}
                            />
                        </div>
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    );
};

export default EcardButtonElement;
