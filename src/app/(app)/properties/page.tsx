import Breadcrumbs from "@/components/shared/breadCrumbs";
import { PropertiesTable } from '@/app/(app)/properties/components/properties-table/properties-table';
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {Plus} from "lucide-react";

const Propiedades = () => {
    return (
        <div className='flex flex-col gap-4 p-4 lg:gap-6 lg:p-6'>
            <div className='mb-5'>
                <Breadcrumbs/>
            </div>
            <div className='flex flex-col w-full gap-5'>
                <Button asChild className="ml-auto" variant="outline">
                    <Link href="/properties/create">
                        <Plus/>
                        New
                    </Link>
                </Button>
                <PropertiesTable/>
            </div>
        </div>
    );
};

export default Propiedades;
