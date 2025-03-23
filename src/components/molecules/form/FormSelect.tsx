import {Label} from "@/components/ui/label";
import React from "react";
import {FieldError} from "react-hook-form";

interface FormSelectProps {
    id: string;
    label: string;
    options: { label: string; value: string }[];
    error?: FieldError;
    className?: string;
    value?: string;
    onChange?: (value: string) => void;
}

export const FormSelect: React.FC<FormSelectProps> = ({
                                                          id,
                                                          label,
                                                          options,
                                                          error,
                                                          className,
                                                          value,
                                                          onChange,
                                                      }) => {
    return (
        <div className={`flex flex-col space-y-1 ${className}`}>
            <Label htmlFor={id}>{label}</Label>
            <select
                id={id}
                value={value}
                onChange={e => onChange?.(e.target.value)}
                className="w-full rounded border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
                {options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>
            {error && <p className="text-sm text-red-600">{error.message}</p>}
        </div>
    );
};