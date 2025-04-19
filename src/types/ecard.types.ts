export type EcardElement = {
    type: 'button' | 'text' | 'social';
    content: string;
    href?: string;
};

export type EcardContentConfig = {
    title: string;
    subtitle: string;
    photoUrl: string;
    elements: EcardElement[];
}

export type EcardTheme = {
    id: string;
    name: string;
    textColor: string;
    buttonColor: string;
    backgroundImage: string;
};

export type EcardConfig = {
    selectedThemeId: string;
    theme: EcardTheme;
    customTheme: EcardTheme;
    contentConfig: EcardContentConfig
};

export type EcardConfigApiType = {
    selectedThemeId: string;
    customTheme: EcardTheme;
    contentConfig: EcardContentConfig
};