"use client"

import * as React from "react"
import { addDays, format } from "date-fns"
import { IoCalendarOutline as CalendarIcon } from "react-icons/io5";
import { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

export function DatePickerWithRange({
                                        className,
                                    }: React.HTMLAttributes<HTMLDivElement>) {
    const [date, setDate] = React.useState<DateRange | undefined>()

    return (
        <div className={cn("grid gap-2", className)}>
    <Popover>
        <PopoverTrigger asChild>
    <Button
        id="date"
    variant={"outline"}
    className={cn(
        "w-[150px] justify-start text-left font-normal border-0",
    !date && "text-muted-foreground"
)}
>
    <CalendarIcon className="mr-2 h-4 w-4" />
    {date?.from ? (
        date.to ? (
            <>
                {format(date.from, "LLL dd, y")} -{" "}
    {format(date.to, "LLL dd, y")}
    </>
) : (
        format(date.from, "LLL dd, y")
    )
) : (
        <span>Desde - Hasta</span>
)}
    </Button>
    </PopoverTrigger>
    <PopoverContent className="w-auto p-0" align="start">
        <Calendar
            initialFocus
    mode="range"
    defaultMonth={date?.from}
    selected={date}
    onSelect={setDate}
    numberOfMonths={2}
    />
    </PopoverContent>
    </Popover>
    </div>
)
}