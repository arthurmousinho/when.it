import Link from "next/link";
import { Bot, Folder, UsersRound, ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type OrganizationCardProps = {
    name: string;
    slug: string;
    membersCount: number;
    isManager: boolean;
    chatsCount: number;
    documentsCount: number;
}

export function OrganizationCard({
    name,
    slug,
    isManager,
    membersCount,
    chatsCount,
    documentsCount,
}: OrganizationCardProps) {

    return (
        <Card className="w-full overflow-hidden transition-all duration-200 gap-4">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-bold truncate">
                        {name}
                    </CardTitle>
                    {isManager
                        ? (
                            <Badge variant="secondary" className="font-medium">
                                Admin
                            </Badge>
                        )
                        : (
                            <Badge variant="outline" className="font-medium">
                                Membro
                            </Badge>
                        )
                    }
                </div>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-3 gap-2 border rounded-lg p-2 bg-muted/30">
                    <div className="flex flex-col items-center justify-center p-2 text-center">
                        <UsersRound className="h-5 w-5 text-primary mb-1" />
                        <span className="font-medium text-sm">{membersCount}</span>
                        <span className="text-xs text-muted-foreground">Membros</span>
                    </div>
                    <div className="flex flex-col items-center justify-center p-2 text-center border-x">
                        <Bot className="h-5 w-5 text-primary mb-1" />
                        <span className="font-medium text-sm">{chatsCount}</span>
                        <span className="text-xs text-muted-foreground">Conversas</span>
                    </div>
                    <div className="flex flex-col items-center justify-center p-2 text-center">
                        <Folder className="h-5 w-5 text-primary mb-1" />
                        <span className="font-medium text-sm">{documentsCount}</span>
                        <span className="text-xs text-muted-foreground">Documentos</span>
                    </div>
                </div>
            </CardContent>
            <CardFooter>
                <Link
                    href={isManager ? `/manager/${slug}` : `/member/${slug}`}
                    type="submit"
                    className={cn(buttonVariants({
                        variant: "secondary",
                        size: "sm",
                        className: "w-full transition-colors hover:bg-primary hover:text-slate-50 group"
                    }))}
                >
                    Acessar
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
            </CardFooter>
        </Card >
    )
}