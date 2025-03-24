'use client'

import React, { useMemo, useState } from "react";
import Breadcrumbs from "@/components/shared/breadCrumbs";
import { SkeletonCard } from "@/app/(app)/properties/components/skeleton";
import PropertyEdition from "@/app/(app)/properties/components/propertyEdition";
import { usePropertyData } from "@/hooks/property/usePropertyData";
import { usePropertyContact } from "@/hooks/property/usePropertyContact";
import {Button} from "@/components/ui/button";
import {FaEdit} from "react-icons/fa";
import PropertyDetail from "@/app/(app)/properties/components/PropertyDetail";
import {usePropertyHandlers} from "@/hooks/property/usePropertyHandlers";

const PropertyComponent = () => {
    const { property, setProperty, loading, error } = usePropertyData();
    const { handlerRechargeProperty } = usePropertyContact(setProperty);
    const [mode, setMode] = useState<"view" | "edit">("view");

    const {handleSubmit, handleDelete } = property
        ? usePropertyHandlers(
            property,
            false,
            handlerRechargeProperty,
            () => setMode('view')
          )
        : {
            handleSubmit: () => {},
            handleDelete: () => {}
        };

    const renderContent = useMemo(() => {
        if (loading) {
            return (
                <div>
                    <div className="p-6">
                        <Breadcrumbs />
                    </div>
                    <SkeletonCard />
                </div>
            );
        }

        if (error || !property) {
            return <div className="p-6 text-red-500">Error loading property</div>;
        }

        return (
            <div className="flex flex-col w-full h-full p-6 gap-6">
                {mode === "edit" ? (
                    <PropertyEdition
                        mode="edit"
                        editFunction={setMode}
                        rechargeFunctionProperty={handlerRechargeProperty}
                        data={property}
                        handleDelete={handleDelete}
                    />
                ) : (
                    <>
                        <div className="flex justify-between items-center">
                            <div className="p-4"><Breadcrumbs /></div>
                            <Button type="button" className="" onClick={() => setMode('edit')}>
                                <FaEdit/>
                                <span className="ml-2">Edit</span>
                            </Button>
                        </div>
                        <PropertyDetail data={property} />
                    </>
                )}
            </div>
        );
    }, [loading, error, property, mode, handlerRechargeProperty]);

    return renderContent;
};

export default PropertyComponent;