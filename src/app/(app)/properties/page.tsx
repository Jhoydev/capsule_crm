import Breadcrumbs from "@/components/shared/breadCrumbs";
import { PropertiesTable } from '@/app/(app)/properties/components/properties-table/properties-table';

const Propiedades = () => {
    return (
        <div className='flex flex-col gap-4 p-4 lg:gap-6 lg:p-6'>
            <div className='mb-5'>
                <Breadcrumbs/>
            </div>
            <div>
                <PropertiesTable/>
            </div>
        </div>
    );
};

export default Propiedades;
