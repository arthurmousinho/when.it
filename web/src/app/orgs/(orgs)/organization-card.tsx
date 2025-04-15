import Link from "next/link";
import Image from "next/image";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MessagesSquare } from "lucide-react"

import backgroundImage from "@/assets/backgrounds/bg1.svg"
import logoImage from "@/assets/backgrounds/bg2.png"

import type { MemberRole } from "@/@types/member"

type OrganizationCardProps = {
    name: string;
    slug: string;
    description: string;
    role: MemberRole;
    chatsCount: number;
}

export function OrganizationCard({
    name,
    slug,
    role,
    description,
    chatsCount
}: OrganizationCardProps) {
    return (
        <Link href={role === 'MANAGER' ? `/manager/${slug}` : `/chatbot/${slug}`}>
            <Card className="w-full overflow-hidden transition-all duration-300 gap-0 pt-0 hover:shadow-md cursor-pointer">
                <div
                    className="h-24 w-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${backgroundImage.src})` }}
                />
                <div className="px-3 -mt-12 flex items-start justify-between">
                    <div className="flex items-center">
                        <div className="h-16 w-16 rounded-full border-4 border-background overflow-hidden bg-background">
                            <Image
                                src={logoImage}
                                alt={name}
                                className="h-full w-full object-cover"
                            />
                        </div>
                    </div>
                </div>
                <CardHeader className="pt-2 flex flex-row w-full items-center justify-between px-3">
                    <CardTitle className="text-lg font-bold truncate">{name}</CardTitle>
                    <Badge variant="outline" className="text-muted-foreground">
                        <MessagesSquare className="h-4 w-4 mr-1" />
                        <span>{chatsCount} chats</span>
                    </Badge>
                </CardHeader>
                <CardContent className="pt-2 px-3">
                    <CardDescription className="text-sm text-muted-foreground leading-relaxed line-clamp-2 h-[45.5]">
                        {description}
                    </CardDescription>
                </CardContent>
            </Card>
        </Link>
    )
}