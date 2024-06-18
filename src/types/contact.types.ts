
export type Contact = {
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
//     alternate_email: string | null;
//     phone: string;
//     mobile: string;
//     avatar_url: string;
//     birthday: string;
//     contact_medium: 'email' | 'phone' | 'sms' | 'other';
//     language: string;
//     notes: string;
//     rgpd: string | null;
//     profession: string;
//     company: string;
//     gender: 'male' | 'female' | 'other';
//     user_id: number;
// }


export type ApiResponseContact = {
    message: string;
    contact: Contact;
    status: number;
}