
export interface Contact {
    id: number;
    first_name: string;
    last_name: string;
    phone: string
    email: string;
}

// export interface Contact {
//     id: number;
//     first_name: string;
//     last_name: string;
//     nif: string;
//     email: string;
//     alternate_email: string;
//     phone: string;
//     mobile: string;
//     avatar_url: string;
//     birthday: string;
//     contact_medium: string;
//     language: string;
//     notes: string;
//     rgpd: string;
//     profession: string;
//     company: string;
//     gender: string;
//     user_id: number;
// }

export interface ApiResponseContact {
    message: string;
    contact: Contact;
    status: number;
}