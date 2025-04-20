import React from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { GripVertical, Pencil } from 'lucide-react';

type props = {
    text?: string;
    onChange: (updatedElement: { content?: string; href?: string }) => void;
};

const EcardTextElement = ({ text, onChange }: props) => {
    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const updatedText = e.target.value;
        onChange({ content: updatedText });
    };

    return (
        <div className="flex items-center justify-between relative">
            <GripVertical className="absolute left-2" size={16} />
            <p className="text-sm w-full text-center">{text}</p>
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
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    );
};

export default EcardTextElement;
