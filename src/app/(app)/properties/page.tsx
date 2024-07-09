'use client'

import DataTable from "@/components/shared/table/dataTable";
import { columns } from "@/components/shared/table/columnsProperties";
import Breadcrumbs from "@/components/shared/breadCrumbs";

const Propiedades = () => {
    const endPointTable = "properties";
    return (
        <div className='flex flex-col gap-4 p-4 lg:gap-6 lg:p-6'>
            <div className='mb-5'>
                <Breadcrumbs/>
            </div>
            <DataTable caption={""} typeTable="properties" endPoint={endPointTable} columns={columns}/>
        </div>
    );
};

export default Propiedades;
