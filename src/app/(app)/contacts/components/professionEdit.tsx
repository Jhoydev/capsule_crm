import React from 'react';
import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";

const ProfessionEdit: React.FC = () => {
    const { register } = useFormContext();

    return (
        <div className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
            <h3 className="font-bold">Profession</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4 p-5">
                <div className="flex flex-col">
                    <label className="mb-2 text-sm text-muted-foreground">Profession</label>
                    <Input type="text" placeholder="Profession" {...register("profession")} />
                </div>
                <div className="flex flex-col">
                    <label className="mb-2 text-sm text-muted-foreground">Company</label>
                    <Input type="text" placeholder="Company" {...register("company")} />
                </div>
            </div>
        </div>
    );
};

export default ProfessionEdit;
