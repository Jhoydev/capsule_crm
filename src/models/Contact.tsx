
export interface Contact {
    id: number;
    first_name: string;
    last_name: string;
    phone: string
    email: string;
}

export interface ApiResponseContact {
    message: string;
    contact: Contact;
    status: number;
}