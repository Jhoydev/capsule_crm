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
import { ReactSortable } from 'react-sortablejs';
import { useState } from 'react';

type props = {
    user: UserType;
    config: EcardConfig;
    setConfig: React.Dispatch<React.SetStateAction<EcardConfig>>;
};
export const EcardPreview = ({ user, config, setConfig }: props) => {
    const theme = config.theme;
    const [list, setList] = useState(config.contentConfig.elements);

    const addElement = (type: 'text' | 'button' | 'social') => {
        const newElement = {
            id: crypto.randomUUID(),
            type,
            content: type,
            href: '',
        };

        setList((prev) => [...prev, newElement]);

        setConfig({
            ...config,
            contentConfig: {
                ...config.contentConfig,
                elements: [...config.contentConfig.elements, newElement],
            },
        });
    };

    const handleSort = (order: string[]) => {
        const reordered = order
            .map((id) => config.contentConfig.elements.find((el) => el.id === id))
            .filter(Boolean) as EcardElement[];

        if (reordered.length === 0) {
            return;
        }

        setConfig({
            ...config,
            contentConfig: {
                ...config.contentConfig,
                elements: reordered,
            },
        });
    };

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
                    <ReactSortable
                        list={list}
                        setList={setList}
                        className="flex flex-col gap-2 w-full pt-4"
                    >
                        {config.contentConfig.elements.map((el, i) => {
                            if (el.type === 'button') {
                                return (
                                    <a
                                        key={i}
                                        href={el.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-4 py-2 rounded-md text-white text-sm font-medium"
                                        style={{ backgroundColor: theme.buttonColor }}
                                    >
                                        {el.content}
                                    </a>
                                );
                            }

                            if (el.type === 'text') {
                                return (
                                    <p key={i} className="text-sm italic">
                                        {el.content}
                                    </p>
                                );
                            }

                            if (el.type === 'social') {
                                return (
                                    <a key={i} href={el.href} className="text-sm underline">
                                        {el.content}
                                    </a>
                                );
                            }

                            return null;
                        })}
                    </ReactSortable>
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
