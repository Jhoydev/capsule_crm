import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Control } from "react-hook-form";

type RenderFormFieldParams = {
    name: string;
    label: string;
    placeholder: string;
    type: string;
    options?: { value: string; label: string }[];
    control: Control<any>;
};

export const renderField = ({ name, label, placeholder, type = "text", options, control }: RenderFormFieldParams) => {
    if (type === "textarea") {
        return (
            <div className="mr-5 w-full">
                <FormField
                    control={control}
                    name={name}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{label}</FormLabel>
                            <FormControl>
                                <Textarea className="w-full" placeholder={placeholder} {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
        );
    } else if (type === "select") {
        return (
            <div className="mr-5">
                <FormField
                    control={control}
                    name={name}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{label}</FormLabel>
                            <FormControl>
                                <Select
                                    onValueChange={field.onChange}
                                    value={field.value}
                                >
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder={placeholder} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>{label}</SelectLabel>
                                            {options?.map(option => (
                                                <SelectItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
        );
    } else {
        return (
            <div className="mr-5">
                <FormField
                    control={control}
                    name={name}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{label}</FormLabel>
                            <FormControl>
                                <Input placeholder={placeholder} type={type} {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
        );
    }
};
