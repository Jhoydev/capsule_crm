'use client'

import DataTable from "@/components/shared/table/dataTable";
import { columns } from "@/components/shared/table/columnsProperties";
import Breadcrumbs from "@/components/shared/breadCrumbs";

const Propiedades = () => {
    const endPointTable = "/properties";
    return (
        <div className='flex flex-col'>
            <div className='mb-5'>
                <Breadcrumbs/>
            </div>
            <div>
                <div>Contenido de Propiedades</div>
                <div className="container mx-auto py-10">
                    <DataTable caption={""} typeTable="properties" endPoint={endPointTable} columns={columns}/>
                </div>
            </div>
        </div>
    );
};

export default Propiedades;
