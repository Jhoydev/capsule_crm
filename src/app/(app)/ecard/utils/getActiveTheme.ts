import { defaultThemes } from '@/app/(app)/ecard/data/defaultThemes';
import { EcardConfig, EcardConfigApiType, EcardTheme } from '@/types/ecard.types';

type props = {
    selectedThemeId: string;
    customTheme: EcardTheme;
}
export function getActiveTheme({ selectedThemeId, customTheme }: props) {
    if (selectedThemeId === 'custom') {
        return customTheme;
    }

    const theme = defaultThemes.find((t) => t.id === selectedThemeId);

    return theme ?? defaultThemes[0];
}
