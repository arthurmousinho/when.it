import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import React from "react";

type Props = {
    icon: React.ElementType;
    title: string;
    value: number;
}

export function StatCard({ icon: Icon, title, value }: Props) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center">
                <Icon className="h-4 w-4 text-muted-foreground" />
                <CardTitle className="text-sm font-medium">
                    {title}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <span className="text-2xl font-bold">
                    {value}
                </span>
            </CardContent>
        </Card>
    )
}