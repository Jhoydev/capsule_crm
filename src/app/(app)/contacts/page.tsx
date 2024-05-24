'use client'

import React, { useState, useEffect } from 'react';
import DataTable from "@/components/shared/table/dataTable";
import { getContacts, Contact } from "@/components/shared/table/contact";
import { columns } from "@/components/shared/table/columnsContact";
import { Button } from "@/components/ui/button"
import { Plus } from 'lucide-react'
import { DatePickerWithRange } from "@/components/shared/dataRangePicker"

const Contactos = () => {
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [date, setDate] = React.useState<Date | undefined>(new Date())

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
        <div className='flex'>
            <div className='flex flex-col'>
                <div>Filtros</div>
                <div className='flex flex-col'>
                    <span>Estados</span>
                    <span>Todos (148)</span>
                    <span>Nuevos (10)</span>
                    <span>Sin actualizar ()</span>
                </div>
                <div className='flex flex-col'>
                    <div>
                        <DatePickerWithRange />
                    </div>
                </div>
            </div>
            <div>
                <div className='flex justify-between'>
                    <h2>Contactos</h2>
                    <Button className=''>
                        Crear contacto
                        <Plus className='ml-2'/>
                    </Button>
                </div>
                <div>
                    <DataTable caption={""} data={contacts} columns={columns}/>
                </div>
            </div>
        </div>
    );
};

export default Contactos;