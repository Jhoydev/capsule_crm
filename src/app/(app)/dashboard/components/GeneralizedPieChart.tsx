"use client"

import * as React from "react"
import {Label, Pie, PieChart} from "recharts"

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
import {useCallback} from "react";

type GeneralizedPieChartType = {
    keyName?: string;
    valueName?: string;
    chartTitle?: string;
    chartDescription?: string;
    data: Record<string, number>;
}


export function GeneralizedPieChart({
    keyName = "key",
    valueName = "value",
    chartTitle = "Chart",
    chartDescription = "Distribution of data",
    data,
}: GeneralizedPieChartType) {
    const [chartData, setChartData] = React.useState<any[]>([])
    const [totalValues, setTotalValues] = React.useState<number>(0)
    const colorGenerator = useCallback((index: number) => `hsl(${index * 60 % 360}, 80%, 70%)`, []);

    React.useEffect(() => {
        const transformedData = Object.keys(data).map((key, index) => ({
            [keyName]: key,
            [valueName]: data[key],
            fill: colorGenerator(index),
        }));

        setChartData(transformedData)
        setTotalValues(
            transformedData.reduce((acc, curr) => acc + (curr[valueName] as number), 0)
        )
    }, [data, keyName, valueName, colorGenerator])

    const chartConfig = {
        [valueName]: {
            label: "Values",
        },
        ...chartData.reduce((config, item, index) => {
            const key = item[keyName];
            config[key] = {label: key, color: item.fill};
            return config;
        }, {}),
    };

    return (
        <Card className="flex h-full min-w-0 flex-col">
            <CardHeader className="items-center px-4 pb-0 pt-4 text-center sm:px-6 sm:pt-6">
                <CardTitle className="text-base sm:text-lg">{chartTitle}</CardTitle>
                <CardDescription className="text-xs sm:text-sm">{chartDescription}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-1 items-center justify-center px-3 pb-4 pt-2 sm:px-6 sm:pb-6">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square h-[220px] w-full max-w-[280px] sm:h-[250px] sm:max-w-[320px]"
                >
                    <PieChart>
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel/>}
                        />
                        <Pie
                            data={chartData}
                            dataKey={valueName}
                            nameKey={keyName}
                            innerRadius={60}
                            strokeWidth={5}
                        >
                            <Label
                                content={({viewBox}) => {
                                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                        return (
                                            <text
                                                x={viewBox.cx}
                                                y={viewBox.cy}
                                                textAnchor="middle"
                                                dominantBaseline="middle"
                                            >
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={viewBox.cy}
                                                    className="fill-foreground text-2xl font-bold sm:text-3xl"
                                                >
                                                    {totalValues.toLocaleString()}
                                                </tspan>
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) + 24}
                                                    className="fill-muted-foreground"
                                                >
                                                    Total
                                                </tspan>
                                            </text>
                                        )
                                    }
                                }}
                            />
                        </Pie>
                    </PieChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
