import { EcardConfig, EcardConfigApiType } from '@/types/ecard.types';

export const mockEcardConfig: EcardConfigApiType = {
    selectedThemeId: "puesta-de-sol",
    customTheme: {
        id: "custom",
        name: "Tema personalizado",
        textColor: "#333333",
        buttonColor: "#ff007f",
        backgroundImage: "https://images.unsplash.com/photo-1517816743773-6e0fd518b4a6",
    },
    contentConfig: {
        title: "¡Bienvenido!",
        subtitle: "Conoce más sobre mí",
        photoUrl: "/avatars/jhoseph.png",
        elements: [
            { type: "button", content: "Mi portafolio", href: "https://jhoseph.dev" },
            { type: "text", content: "Gracias por tu tiempo" },
        ],
    }
};

/**
 * Simula una llamada al backend para obtener la configuración de la ecard de un usuario.
 */
export async function fetchEcardConfig(userId: string): Promise<EcardConfigApiType> {
    console.log(`Simulando fetch de configuración para userId: ${userId}`);

    // Simula delay de red
    await new Promise((resolve) => setTimeout(resolve, 500));

    // En el futuro: aquí harías la petición real, ejemplo:
    // const response = await axios.get(`/api/ecard/${userId}`);
    // return response.data;

    return mockEcardConfig;
}