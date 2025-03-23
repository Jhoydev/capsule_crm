import {Label} from "@/components/ui/label";
import React from "react";
import {FieldError} from "react-hook-form";

interface FormTextareaProps {
    id: string;
    label: string;
    error?: FieldError;
    register: any;
    className?: string;
    placeholder?: string;
    rows?: number;
}

export const FormTextarea: React.FC<FormTextareaProps> = ({
  id,
  label,
  error,
  register,
  className,
  placeholder,
  rows = 4,
}) => {
    return (
        <div className={`flex flex-col space-y-1 ${className}`}>
            <Label htmlFor={id}>{label}</Label>
            <textarea
                id={id}
                rows={rows}
                placeholder={placeholder}
                {...register}
                className="w-full rounded border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            />
            {error && <p className="text-sm text-red-600">{error.message}</p>}
        </div>
    );
};