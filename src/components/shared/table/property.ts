
export type Property = {
    id: number
    ref: string
    titulo: string
    calidades: string
}

export async function getProperties(): Promise<Property[]> {
    // Fetch data from your API here.
    //petición api
    return [
        {
            id: 1,
            ref: "1246-l",
            titulo: "Bungalow Planta Alta en Elche",
            calidades: "",
        },
        {
            id: 2,
            ref: "236668-J",
            titulo: "Casa en Valencia centro",
            calidades: "",
        },
        {
            id: 3,
            ref: "66658-P",
            titulo: "Apartamento en plaza madrid Elche",
            calidades: "",
        },
        // ...
    ]
}