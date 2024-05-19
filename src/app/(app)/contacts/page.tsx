'use client'

import React, { useState, useEffect } from 'react';
import DataTable from "@/components/shared/table/dataTable";
import { getContacts, Contact } from "@/components/shared/table/contact";
import { columns } from "@/components/shared/table/columnsContact";

const Contactos = () => {
    const [contacts, setContacts] = useState<Contact[]>([]);

    useEffect(() => {
        const loadContacts = async () => {
            try {
                const datos = await getContacts();
                setContacts(datos);
            } catch (error) {
                console.error("Error fetching contacts:", error);
            }
        };

        loadContacts();
    }, []); // Este array vacío asegura que el efecto se ejecute solo una vez después del montaje del componente.

    return (
        <div>
            <div>Contenido de Contactos</div>
            <div className="container mx-auto py-10">
            <DataTable caption={""} data={contacts} columns={columns} />
            </div>
        </div>
    );
};

export default Contactos;