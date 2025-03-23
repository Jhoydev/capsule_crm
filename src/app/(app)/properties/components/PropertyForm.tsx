import React, {useCallback, useState} from "react";
import {FormProvider, useForm} from "react-hook-form";
import {PropertyFormValues} from "@/utils/forms/property.utils";
import {Property} from "@/types/property.types";
import {useRouter} from "next/navigation";
import {uploadedFileType} from "@/types/image-upload.types";
import Breadcrumbs from "@/components/shared/breadCrumbs";
import {Button} from "@/components/ui/button";
import {FaSave} from "react-icons/fa";
import AlertDialog from "@/components/shared/alertDialog";
import GalleryPhotos from "@/app/(app)/properties/components/galleryPhotos";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {MdCloudUpload, MdDelete} from "react-icons/md";
import ImageUpload from "@/components/organisms/common/ImageUpload";
import {PropertyService} from "@/services/property.service";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from "@/components/ui/sheet";
import {ImageModal} from "@/app/(app)/properties/components/imageModal";
import AgentEdition from "@/app/(app)/properties/components/agentEdition";
import PricesEdition from "@/app/(app)/properties/components/pricesEdition";
import LocationEdition from "@/app/(app)/properties/components/locationEdition";
import PropertyCharacteristicsEdition from "@/app/(app)/properties/components/propertyCharacteristicsEdition";
import PropertyDescriptionsEdition from "@/app/(app)/properties/components/propertyDescriptionsEdition";
import PropertyContactEdit from "@/app/(app)/properties/components/propertyContactEdit";

export const PropertyForm: React.FC<{
    methods: ReturnType<typeof useForm<PropertyFormValues>>;
    handleSubmit: (values: PropertyFormValues) => Promise<void>;
    isSubmitting: boolean;
    data: Property;
    setIsEditing: (param: boolean) => void;
    handleDelete: () => Promise<any>;
    router: ReturnType<typeof useRouter>;
    rechargeFunctionProperty?: (propertyData: Property) => void;
    isNew?: boolean;
}> = ({
          methods,
          handleSubmit,
          isSubmitting,
          data,
          setIsEditing,
          handleDelete,
          router,
          rechargeFunctionProperty,
          isNew
      }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleUploadedFiles = useCallback((files: uploadedFileType[]) => {
        console.log(files);
    }, []);

    const handleKeyDown = (event: React.KeyboardEvent<HTMLFormElement | HTMLInputElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault();
        }
    };

    return (
        <FormProvider {...methods}>
            <form
                onSubmit={methods.handleSubmit(handleSubmit)}
                onKeyDown={handleKeyDown}
                className="h-full w-full"
            >
                <div className="flex justify-between items-center gap-2 p-4 mb-4">
                    <Breadcrumbs/>
                    <div className="flex justify-end items-center w-1/3 gap-4">
                        <Button type="submit" disabled={isSubmitting}>
                            <FaSave/>
                            <span className="ml-2">Save</span>
                        </Button>
                        <AlertDialog
                            title="Do you want to delete this property?"
                            description="If you delete, you will lose any unsaved changes."
                            triggerText="Delete"
                            variantButtonTrigger="destructive"
                            onAccept={async () => {
                                await handleDelete();
                                setIsEditing(false);
                                router.push('/properties');
                            }}
                        />
                        <AlertDialog
                            title="Do you want to cancel?"
                            description="If you cancel, you will lose any unsaved changes."
                            triggerText="Cancel"
                            variantButtonTrigger="outline"
                            onAccept={() => {
                                if (isNew) {
                                    router.push('/properties');
                                } else {
                                    setIsEditing(false);
                                }
                            }}
                        />
                    </div>
                </div>
                <div className="flex flex-col w-full gap-6 box-border p-5 h-[calc(100vh-150px)] overflow-y-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-7 md:col-span-1 gap-4">
                        <div className="md:col-span-5 border p-5 shadow rounded-md relative">
                            <GalleryPhotos property={data}/>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button
                                        className="absolute top-[30px] left-[37px] z-[1] bg-slate-900 bg-opacity-25 hover:bg-opacity-70 hover:bg-slate-900">
                                        <MdCloudUpload/>
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[425px]">
                                    <DialogHeader>
                                        <DialogTitle className="text-center">Upload your files</DialogTitle>
                                        <DialogDescription className="text-center">
                                            The only file upload you will ever need
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="grid gap-4 py-4">
                                        <ImageUpload
                                            maxFiles={10}
                                            resourceId={data.id}
                                            fileUploaderService={new PropertyService()}
                                            onUploadedFiles={handleUploadedFiles}
                                        />
                                    </div>
                                </DialogContent>
                            </Dialog>
                            <Sheet open={isModalOpen} onOpenChange={setIsModalOpen}>
                                <SheetTrigger asChild>
                                    <Button
                                        onClick={() => setIsModalOpen(true)}
                                        className="absolute top-[30px] left-[90px] z-[1] bg-red-600 bg-opacity-25 hover:bg-opacity-70 hover:bg-red-600 text-white flex items-center space-x-2"
                                    >
                                        <MdDelete/>
                                    </Button>
                                </SheetTrigger>
                                <SheetContent className="modal-sheet-contacts overflow-y-auto">
                                    <SheetHeader>
                                        <SheetTitle>Delete Images</SheetTitle>
                                    </SheetHeader>
                                    <ImageModal property={data} rechargeFunctionProperty={rechargeFunctionProperty}/>
                                    <SheetFooter>
                                        <SheetClose asChild>
                                            <Button className="hidden" type="button" variant="destructive">
                                                Delete Selected Images
                                            </Button>
                                        </SheetClose>
                                    </SheetFooter>
                                </SheetContent>
                            </Sheet>
                        </div>
                        <div className="md:col-span-2 flex flex-col justify-between gap-4">
                            <AgentEdition/>
                            <PricesEdition/>
                        </div>
                    </div>
                    <LocationEdition/>
                    <PropertyCharacteristicsEdition/>
                    <PropertyDescriptionsEdition/>
                    <PropertyContactEdit/>
                </div>
            </form>
        </FormProvider>
    );
};