'use client'

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

type WeeklyUsageItem = {
    date: string;
    messagesCount: number;
}

type Props = {
    weeklyUsage: WeeklyUsageItem[];
}

const getWeekdayShort = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("pt-BR", {
        weekday: "short",
    }).replace('.', '')
}

const chartConfig = {
    count: {
        label: "Mensagens",
        color: "var(--chart-1)",
    },
} satisfies ChartConfig

export function ChatWeeklyUsage({ weeklyUsage }: Props) {
    const chartData = weeklyUsage.map(item => ({
        day: getWeekdayShort(item.date),
        count: item.messagesCount,
    }))

    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    Uso semanal do chatbot
                </CardTitle>
                <CardDescription>
                    Número de mensagens trocadas com o chatbot ao longo da semana.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="h-[140px] w-full">
                    <AreaChart
                        accessibilityLayer
                        data={chartData}
                        margin={{ left: 12, right: 12 }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="day"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="line" />}
                        />
                        <Area
                            dataKey="count"
                            type="natural"
                            fill="var(--color-count)"
                            fillOpacity={0.4}
                            stroke="var(--color-count)"
                        />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}