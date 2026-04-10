"use client"

import * as React from "react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"

type GeneralizedBarChartType =  {
    data: any[];
    keyName?: string;
    valueName?: string;
    chartTitle?: string;
    chartDescription?: string;
}

const colorGenerator = (index: number) => `hsl(${index * 60 % 360}, 80%, 70%)`;

export function GeneralizedBarChart({
    data,
    keyName = "key", // Campo para el eje Y
    valueName = "value", // Campo para el eje X
    chartTitle = "Bar Chart",
    chartDescription = "Data Distribution",
}: GeneralizedBarChartType ) {
    const [chartData, setChartData] = React.useState<any[]>([])
    const [totalValues, setTotalValues] = React.useState<number>(0)


    React.useEffect(() => {
        // @ts-ignore
        const transformedData = Object.keys(data).map((key, index) => ({
            [keyName]: key,
            [valueName]: (data as Record<string, any>)[key],
            fill: colorGenerator(index),
        }));

        setChartData(transformedData)
        setTotalValues(
            transformedData.reduce((acc, curr) => acc + curr[valueName], 0)
        )
    }, [data, keyName, valueName, colorGenerator])

    // Generar configuración dinámica basada en los datos
    const chartConfig = {
        [valueName]: {
            label: "Totals",
        },
        ...chartData.reduce((config, item, index) => {
            const key = item[keyName];
            config[key] = {
                label: key,
                color: colorGenerator(index),
            };
            return config;
        }, {}),
    };

    return (
        <Card className="flex h-full min-w-0 flex-col">
            <CardHeader className="px-4 pb-0 pt-4 sm:px-6 sm:pt-6">
                <CardTitle className="text-base sm:text-lg">{chartTitle}</CardTitle>
                <CardDescription className="text-xs sm:text-sm">{chartDescription}</CardDescription>
            </CardHeader>
            <CardContent className="px-3 pb-4 pt-2 sm:px-6 sm:pb-6">
                <ChartContainer config={chartConfig} className="h-[220px] w-full sm:h-[250px]">
                    <BarChart accessibilityLayer data={chartData}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey={keyName}
                            tickLine={false}
                            tickMargin={8}
                            axisLine={false}
                            tickFormatter={(value) => String(value).slice(0, 8)}
                            interval={0}
                            minTickGap={16}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Bar dataKey={valueName} radius={4} maxBarSize={28} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
