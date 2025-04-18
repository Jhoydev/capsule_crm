'use client';

import { useEcardConfig } from '@/hooks/useEcardConfig';
import clsx from 'clsx';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import React from 'react';
import { UserType } from '@/types/user.type';

export const EcardPreview = ({ user }: { user: UserType }) => {
    const { config } = useEcardConfig();
    const theme = config.customTheme;

    return (
        <div
            className="w-full max-w-md mx-auto rounded-xl overflow-hidden shadow-lg"
            style={{
                backgroundImage: `url(${theme.backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                color: theme.textColor,
            }}
        >
            <div className="bg-black/50 p-6 flex flex-col items-center text-center space-y-4">
                {/* Avatar */}
                <Avatar className="w-24 h-24 rounded-full border-4 border-white object-cover">
                    <AvatarImage className="object-cover object-center" src={user.avatar_url} alt="@shadcn" />
                    <AvatarFallback>SC</AvatarFallback>
                </Avatar>

                {/* Título */}
                <h1 className="text-2xl font-bold">{config.title}</h1>

                {/* Subtítulo */}
                <p className="text-sm opacity-90">{config.subtitle}</p>

                {/* Elementos dinámicos (placeholder por ahora) */}
                <div className="flex flex-wrap gap-2 justify-center pt-4">
                    {config.elements.map((el, i) => {
                        if (el.type === 'button') {
                            return (
                                <a
                                    key={i}
                                    href={el.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-4 py-2 rounded-md text-white text-sm"
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
                </div>
            </div>
        </div>
    );
};
