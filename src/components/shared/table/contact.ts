
export type Contact = {
    id: number
    nombre: string
    telefono: string
    email: string
}

export async function getContacts(): Promise<Contact[]> {
    // Fetch data from your API here.
    //petición api
    return [
        {
            id: 1,
            nombre: "Pedro Casado",
            telefono: "611111111",
            email: "pedro.c@example.com",
        },
        {
            id: 2,
            nombre: "Julieta Contreras",
            telefono: "622222",
            email: "julia@example.com",
        },
        {
            id: 3,
            nombre: "Santi Turubull",
            telefono: "633333",
            email: "santi.c@example.com",
        },
        {
            id: 4,
            nombre: "Carmen Campos",
            telefono: "644444444",
            email: "carmen.g@example.com",
        },
        {
            id: 5,
            nombre: "Laura Langa",
            telefono: "655555555",
            email: "laura.l@example.com",
        },
        // ...
    ]
}