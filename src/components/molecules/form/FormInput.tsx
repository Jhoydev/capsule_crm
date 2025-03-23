import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import React from "react";
import {FieldError, UseFormRegister} from "react-hook-form";

interface FormInputProps {
    id: string;
    label: string;
    type?: string;
    error?: FieldError | undefined | any;
    register: any;
    className?: string;
    placeholder?: string;
    icon?: React.ReactNode;
    onBlur?: (value: string) => void;
}

export const FormInput: React.FC<FormInputProps> = ({
                                                        id,
                                                        label,
                                                        type = "text",
                                                        error,
                                                        register,
                                                        className,
                                                        placeholder,
                                                        icon,
                                                        onBlur
                                                    }: FormInputProps) => {
    return (
        <div className={`flex flex-col space-y-1 ${className}`}>
            <Label htmlFor={id}>{label}</Label>
            <div className="relative">
                {icon && (
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                        {icon}
                    </div>
                )}
                <Input
                    id={id}
                    type={type}
                    placeholder={placeholder}
                    className={icon ? 'pl-10' : ''}
                    {...register}
                    onBlur={e => onBlur?.(e.target.value)}
                />
            </div>
            {error && <p className="text-sm text-red-600">{error.message}</p>}
        </div>
    );
};