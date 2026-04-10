import React from 'react';
import { useFormContext } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";

const RgpdEdit: React.FC = () => {
    const { register } = useFormContext();

    return (
        <div className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
            <h3 className="font-bold">RGPD</h3>
            <div className="grid grid-cols-1 gap-4 p-5">
                <div className="flex flex-col">
                    <Textarea
                        placeholder="Enter RGPD information..."
                        className="min-h-32 resize-none"
                        {...register("rgpd")}
                    />
                </div>
            </div>
        </div>
    );
};

export default RgpdEdit;
