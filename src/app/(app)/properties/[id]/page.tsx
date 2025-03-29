'use client';

import React, { useCallback, useState } from 'react';
import Breadcrumbs from '@/components/shared/breadCrumbs';
import { SkeletonCard } from '@/app/(app)/properties/components/skeleton';
import PropertyEdition from '@/app/(app)/properties/components/propertyEdition';
import { usePropertyData } from '@/hooks/property/usePropertyData';
import { usePropertyContact } from '@/hooks/property/usePropertyContact';
import { usePropertyHandlers } from '@/hooks/property/usePropertyHandlers';
import { Button } from '@/components/ui/button';
import { FaEdit } from 'react-icons/fa';
import PropertyDetail from '@/app/(app)/properties/components/PropertyDetail';

const Property = () => {
  const { property, setProperty, loading, error } = usePropertyData();
  const { handlerRechargeProperty } = usePropertyContact(setProperty);
  const [mode, setMode] = useState<'view' | 'edit'>('view');

  const onSuccess = useCallback(() => setMode('view'), []);

  const { handleSubmit, handleDelete, isSubmitting } = usePropertyHandlers(
      property,
      false,
      handlerRechargeProperty,
      onSuccess
  );

  if (loading) {
    return (
      <div className="p-6">
        <Breadcrumbs />
        <SkeletonCard />
      </div>
    );
  }

  if (error || !property) {
    return <div className="p-6 text-red-500">Error loading property</div>;
  }

  return (
    <div className="flex flex-col w-full h-full p-6 gap-6">
      {mode === 'edit' ? (
        <PropertyEdition
          mode="edit"
          handleViewMode={setMode}
          rechargeFunctionProperty={handlerRechargeProperty}
          data={property}
          handleDelete={handleDelete}
          handleSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />
      ) : (
        <>
          <div className="flex justify-between items-center">
            <Breadcrumbs />
            <Button type="button" onClick={() => setMode('edit')}>
              <FaEdit />
              <span className="ml-2">Edit</span>
            </Button>
          </div>
          <PropertyDetail data={property} />
        </>
      )}
    </div>
  );
};

export default Property;
