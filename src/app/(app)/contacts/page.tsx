'use client'

import React, { useState, useEffect } from 'react';
import DataTable from "@/components/shared/table/dataTable";
import { Contact } from "@/models/Contact";
import { getContacts } from "@/lib/api";
import { columns } from "@/components/shared/table/columnsContact";
import { Button } from "@/components/ui/button"
import { IoIosSearch } from "react-icons/io";
import { CiCirclePlus } from "react-icons/ci";
import { DatePickerWithRange } from "@/components/shared/dataRangePicker"
import { Input } from "@/components/ui/input"

const Contactos = () => {
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [date, setDate] = React.useState<Date | undefined>(new Date())

    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const datos = await getContacts();
                setContacts(datos);
            } catch (error) {
                console.error("Error fetching contacts:", error);
            }
        };

        fetchContacts();
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
                <div className='flex w-full max-w-lg items-center space-x-2 mb-5 justify-center'>
                    <Input type='text' placeholder='Buscar...' className='w-full'/>
                    <Button type="submit">
                        <IoIosSearch />
                    </Button>
                </div>
                <div className='flex justify-between mb-5 items-center'>
                    <h2>Contactos</h2>
                    <Button className=''>
                    Crear contacto
                        <CiCirclePlus className='ml-2'/>
                    </Button>
                </div>
                <div className='w-full'>
                    <DataTable caption={""} data={contacts} columns={columns}/>
                </div>
            </div>
        </div>
    );
};

export default Contactos;