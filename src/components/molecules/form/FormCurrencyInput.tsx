import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import React from "react";

interface FormCurrencyInputProps {
    id: string;
    label: string;
    register: any;
    className?: string;
    placeholder?: string;
}

export const FormCurrencyInput: React.FC<FormCurrencyInputProps> = ({
                                                                        id,
                                                                        label,
                                                                        register,
                                                                        className,
                                                                        placeholder,
                                                                    }) => {
    return (
        <div className={`flex flex-col space-y-1 ${className}`}>
            <Label htmlFor={id}>{label}</Label>
            <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground select-none">€</span>
                <Input
                    id={id}
                    placeholder={placeholder}
                    {...register}
                    className="pl-8"
                    type="number"
                />
            </div>
        </div>
    );
};