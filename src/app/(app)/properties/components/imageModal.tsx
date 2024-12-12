import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { Image } from "@/types/image.types";
import { Property } from "@/types/property.types";
import React, { useState } from "react";
import {PropertyService} from "@/services/property.service";
import {toast, useToast} from "@/hooks/use-toast";
import {MdDelete} from "react-icons/md";

interface ImageModalProps {
    property: Property;
}

export function ImageModal({ property }: ImageModalProps) {
    const [selectedImages, setSelectedImages] = useState<number[]>([]);
    const images = property.image || [];
    const propertyService = new PropertyService();
    const { toast } = useToast();

    const toggleSelectImage = (id: number) => {
        setSelectedImages((prev) =>
            prev.includes(id) ? prev.filter((imgId) => imgId !== id) : [...prev, id]
        );
    };

    const handleDelete = async () => {
        try {
            let allSuccess = true;
            for (const imageId of selectedImages) {
                const { message } = await propertyService.deleteImage( property.id, { image_id: imageId });

                if (!message.includes("success")) {
                    allSuccess = false;
                    toast({
                        variant: 'destructive',
                        title: 'Error',
                        description: `Error deleting image with ID ${imageId}`,
                    });
                }
            }

            if (allSuccess) {
                toast({
                    title: 'Successfully',
                    description: 'All selected images were successfully deleted',
                });
                setSelectedImages([]); // Limpiar la selección
            }

        } catch (error) {
            toast({
                variant: 'destructive',
                title: 'Error',
                description: `Error deleting image ${error}`,
            });
        }
    };

    return (
        <div className="mt-4">
            <div className="flex flex-wrap gap-4">
                {images.map((image: Image) => (
                    <div
                        key={image.id}
                        className="relative group w-1/2 sm:w-1/3 lg:w-1/4 flex-shrink-0"
                    >
                        {/* Imagen */}
                        <img
                            src={image.image_name}
                            alt="image"
                            className="w-full h-32 object-cover rounded-lg border"
                        />
                        {/* Checkbox para seleccionar */}
                        <input
                            type="checkbox"
                            className="absolute top-2 left-2 w-4 h-4 z-10"
                            checked={selectedImages.includes(image.id)}
                            onChange={() => toggleSelectImage(image.id)}
                        />
                    </div>
                ))}
            </div>
            {/* Botón de borrar seleccionados */}
            <div className="w-full flex justify-end">
                <Button
                    variant="destructive"
                    className="mt-4"
                    onClick={handleDelete}
                    disabled={selectedImages.length === 0}
                >
                    <MdDelete />
                    Delete Images
                </Button>
            </div>

        </div>
    );
}
