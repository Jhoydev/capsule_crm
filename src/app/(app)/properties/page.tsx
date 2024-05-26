'use client'

import React, { useState, useEffect } from 'react';
import DataTable from "@/components/shared/table/dataTable";
import { Property } from "@/models/Property";
import { getProperties } from "@/lib/api";
import { columns } from "@/components/shared/table/columnsProperties";

const Propiedades = () => {

    const [properties, setProperties] = useState<Property[]>([]);

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const datos = await getProperties();
                setProperties(datos);
            } catch (error) {
                console.error("Error fetching properties:", error);
            }
        };

        fetchProperties();
    }, []); // Este array vacío asegura que el efecto se ejecute solo una vez después del montaje del componente.

    return (
        <div>
            <div>Contenido de Propiedades</div>
            <div className="container mx-auto py-10">
                <DataTable caption={""} data={properties} columns={columns} />
            </div>
        </div>
    );
};

export default Propiedades;
