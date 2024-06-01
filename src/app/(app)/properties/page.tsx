'use client'

import DataTable from "@/components/shared/table/dataTable";
import { columns } from "@/components/shared/table/columnsProperties";

const Propiedades = () => {
    const endPointTable = "/properties";
    return (
        <div>
            <div>Contenido de Propiedades</div>
            <div className="container mx-auto py-10">
                <DataTable caption={""} endpoint={endPointTable} columns={columns} />
            </div>
        </div>
    );
};

export default Propiedades;
