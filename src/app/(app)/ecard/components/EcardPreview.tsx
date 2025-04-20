'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { UserType } from '@/types/user.type';
import { EcardConfig, EcardElement } from '@/types/ecard.types';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useState } from 'react';
import { Reorder, useDragControls } from 'framer-motion';
import EcardButtonElement from '@/app/(app)/ecard/components/EcardButtonElement';
import EcardTextElement from '@/app/(app)/ecard/components/EcardTextElement';
import EcardSocialElement from '@/app/(app)/ecard/components/EcardSocialElement';

type props = {
    user: UserType;
    config: EcardConfig;
    setConfig: React.Dispatch<React.SetStateAction<EcardConfig>>;
};
export const EcardPreview = ({ user, config, setConfig }: props) => {
    const theme = config.theme;
    const controls = useDragControls()

    const addElement = (type: 'text' | 'button' | 'social') => {
        const newElement = {
            id: crypto.randomUUID(),
            type,
            content: type,
            href: '',
        };

        setConfig({
            ...config,
            contentConfig: {
                ...config.contentConfig,
                elements: [...config.contentConfig.elements, newElement],
            },
        });
    };

    const updateOrder = (newOrder: EcardElement[]) => {
        setConfig({
            ...config,
            contentConfig: {
                ...config.contentConfig,
                elements: newOrder,
            },
        });
    };

    const handleElementChange = (id: string, updatedElement: { text?: string; href?: string }) => {
        setConfig({
            ...config,
            contentConfig: {
                ...config.contentConfig,
                elements: config.contentConfig.elements.map((el) =>
                    el.id === id ? { ...el, ...updatedElement } : el
                ),
            },
        });
    }

    return (
        <div
            className="w-full max-w-xs mx-auto aspect-[9/16] rounded-[2rem] shadow-2xl overflow-hidden border border-gray-300 bg-white relative"
            style={{
                backgroundImage: `url(${theme.backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <div className="absolute inset-0 flex flex-col items-center justify-start text-center p-6 space-y-4 overflow-y-auto bg-black/40">
                <div className="w-full">
                    {/* ✅ Avatar */}
                    <Avatar className="w-24 h-24 mx-auto border-4 border-white mb-3">
                        <AvatarImage className="object-cover object-center" src={user.avatar_url} alt="Avatar" />
                        <AvatarFallback>SC</AvatarFallback>
                    </Avatar>

                    {/* ✅ Título y subtítulo */}
                    <h1 className="text-2xl font-bold" style={{ color: config.theme.textColor }}>
                        {config.contentConfig.title}
                    </h1>
                    <p className="text-sm opacity-90" style={{ color: config.theme.textColor }}>
                        {config.contentConfig.subtitle}
                    </p>
                </div>

                {/* ✅ Elementos (botones, texto, redes) */}
                <div className="mt-4 flex flex-col gap-2 items-center w-full">
                    <Reorder.Group
                        axis="y"
                        values={config.contentConfig.elements}
                        onReorder={updateOrder}
                        className="flex flex-col gap-2 pt-4 w-full"
                    >
                        {config.contentConfig.elements.map((el, i) => (
                            <Reorder.Item
                                key={el.id}
                                value={el}
                                className="p-2 rounded bg-white/10 cursor-grab"
                                whileDrag={{ scale: 1.02, boxShadow: '0 2px 10px rgba(0,0,0,0.2)' }}
                                dragControls={controls}
                            >
                                {el.type === 'button' && (
                                    <EcardButtonElement
                                        key={el.id}
                                        href={el.href}
                                        buttonColor={config.theme.buttonColor}
                                        text={el.content}
                                        onChange={(updatedElement) => handleElementChange(el.id, updatedElement)}
                                    />
                                )}

                                {el.type === 'text' && (
                                    <EcardTextElement key={el.id} text={el.content} onChange={(updatedElement) => handleElementChange(el.id, updatedElement)} />
                                )}

                                {el.type === 'social' && (
                                    <EcardSocialElement
                                        key={el.id}
                                        href={el.href}
                                        text={el.content}
                                    />
                                )}
                            </Reorder.Item>
                        ))}
                    </Reorder.Group>
                    <div className="mt-6">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline">+ Agregar elemento</Button>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent align="start">
                                <DropdownMenuItem onClick={() => addElement('text')}>Texto</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => addElement('button')}>Botón</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => addElement('social')}>Red social</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </div>
        </div>
    );
};
