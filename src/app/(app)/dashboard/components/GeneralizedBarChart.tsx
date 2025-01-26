"use client"

import * as React from "react"
import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
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
        <Card className="flex-grow">
            <CardHeader>
                <CardTitle>{chartTitle}</CardTitle>
                <CardDescription>{chartDescription}</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <BarChart accessibilityLayer data={chartData}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey={keyName}
                            tickLine={false}
                            tickMargin={2}
                            axisLine={false}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Bar dataKey={valueName} radius={2} barSize={10} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
