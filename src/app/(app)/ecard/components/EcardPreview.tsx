'use client';

import { useEcardConfig } from '@/hooks/useEcardConfig';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { UserType } from '@/types/user.type';

export const EcardPreview = ({
    user,
    configState,
}: {
    user: UserType;
    configState: ReturnType<typeof useEcardConfig>;
}) => {
    const { config, updateConfig } = configState;
    const theme = config.customTheme;

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
                    <h1 className="text-2xl font-bold" style={{ color: config.customTheme.textColor }}>
                        {config.title}
                    </h1>
                    <p className="text-sm opacity-90" style={{ color: config.customTheme.textColor }}>
                        {config.subtitle}
                    </p>
                </div>

                {/* ✅ Elementos (botones, texto, redes) */}
                <div className="mt-4 flex flex-col gap-2 items-center w-full">
                    {config.elements.map((el, i) => {
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
                </div>
            </div>
        </div>
    );
};
