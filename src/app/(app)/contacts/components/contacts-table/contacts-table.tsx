import { DataTable } from '@/components/shared/data-table/data-table';
import { contactColumns } from '@/app/(app)/contacts/components/contacts-table/data/contact-columns';
import { useEffect, useState } from 'react';
import { getAll } from '@/app/(app)/contacts/services/contactApi';
import { Contact } from '@/app/(app)/contacts/components/contacts-table/data/schema';
import { Contact as ApiContact } from '@/types/contact.types';

function parseContactData(data: ApiContact[]) {
    return data.map(c => {
        return {
            id: c.id,
            name: `${c.first_name} ${c.last_name}`.trim(),
            email: `${c.email}`,
            phone: `${c.phone}`
        }
    })
}

export function ContactTable() {
    const [isLoading, setIsLoading] = useState(true);
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [total, setTotal] = useState(0);
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    });

    useEffect( () => {
        setIsLoading(true)
        const fetchContact = async () => {
            const response = await getAll({
                pageIndex: pagination.pageIndex,
                pageSize: pagination.pageSize
            })
            const data = parseContactData(response.data)
            setContacts(data)
            setTotal(response.total)
            setIsLoading(false)
        }

        void fetchContact()
    },[pagination])

    if (isLoading) {
        return 'Loading...'
    }

    return <DataTable
        data={contacts}
        columns={contactColumns}
        pagination={pagination}
        total={total}
        setPagination={setPagination} />
}
