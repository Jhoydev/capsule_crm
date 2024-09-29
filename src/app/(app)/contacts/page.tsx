'use client'

import Breadcrumbs from "@/components/shared/breadCrumbs";
import { ContactsTable } from '@/app/(app)/contacts/components/contacts-table/contacts-table';

const Contactos = () => {
    return (
        <div className='flex flex-col gap-4 p-4 lg:gap-6 lg:p-6'>
            <div className='mb-5'>
                <Breadcrumbs/>
            </div>
            <div className='w-full'>
                <ContactsTable/>
            </div>
        </div>
    );
};

export default Contactos;
