import { ChatWeeklyUsage } from "@/components/chat-weekly-usage";
import { getOrganizationDashboard } from "@/http/organization/get-organization-dashboard.http";
import { ArrowUpRight, Bot, FileText, FileUp, Folder, MessageSquare, MessagesSquare, UsersRound } from "lucide-react";
import { InviteMemberDialog } from "./members/invite-member-dialog";
import { StatCard } from "@/components/stat-card";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { IconCard } from "@/components/icon-card";
import { Progress } from "@/components/ui/progress";
import { cn, formatBytes, formatDate } from "@/lib/utils";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

type Props = {
    params: {
        slug: string;
    }
}

export default async function OrganizationDashboard({ params: { slug } }: Props) {

    const { dashboard } = await getOrganizationDashboard(slug);

    return (
        <div className="w-full space-y-4">
            <header className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">
                    Dasboard - {dashboard.organization.name}
                </h2>
                <InviteMemberDialog />
            </header>
            <section className="grid grid-cols-3 gap-1">
                <div className="col-span-2">
                    <ChatWeeklyUsage weeklyUsage={dashboard.weeklyUsage} />
                </div>
                <div className="grid grid-cols-2 gap-1 flex-1">
                    <StatCard
                        icon={FileText}
                        title="Documentos"
                        value={dashboard.documents.totalCount}
                    />
                    <StatCard
                        icon={UsersRound}
                        title="Membros"
                        value={dashboard.members.totalCount}
                    />
                    <StatCard
                        icon={MessagesSquare}
                        title="Conversas"
                        value={dashboard.chats.totalCount}
                    />
                    <StatCard
                        icon={MessageSquare}
                        title="Mensagens"
                        value={dashboard.messages.totalCount}
                    />
                </div>
            </section>
            <section className="grid grid-cols-4 gap-1">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex flex-row items-center gap-2">
                            <IconCard className="p-2">
                                <Bot size={15} />
                            </IconCard>
                            Documentos Integrados
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="bg-muted rounded-md border px-4 py-2 text-sm">
                            {dashboard.documents.embeddedCount} documentos
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="flex flex-row items-center gap-2">
                            <IconCard className="p-2">
                                <FileUp size={15} />
                            </IconCard>
                            Documentos Enviados
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="bg-muted rounded-md border px-4 py-2 text-sm">
                            {dashboard.documents.uploadedCount} documentos
                        </div>
                    </CardContent>
                </Card>
                <Card className="col-span-2">
                    <CardHeader>
                        <CardTitle>
                            Armazenamento de Documentos
                        </CardTitle>
                        <CardDescription>
                            Uso de armazenamento dos documentos da sua organização
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            <Progress
                                value={(dashboard.documents.totalFileSize / (1024 * 1024 * 1024)) * 100}
                                className="w-full h-4"
                            />
                            <div className="flex justify-between text-sm text-muted-foreground">
                                <span>{formatBytes(dashboard.documents.totalFileSize)}</span>
                                <span>1 GB</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </section>
            <section>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <header className="space-y-1.5">
                            <div className="flex flex-row items-center gap-2">
                                <IconCard className="p-2">
                                    <MessageSquare size={15} />
                                </IconCard>
                                <CardTitle>
                                    Mensagens Recentes
                                </CardTitle>
                            </div>
                            <CardDescription>
                                Lista das últimas mensagens enviadas pelos membros da sua organização
                            </CardDescription>
                        </header>
                        <Link
                            href={`/manager/${slug}/messages`}
                            className={cn(buttonVariants({ variant: 'outline' }))}
                        >
                            Ver todas
                            <ArrowUpRight />
                        </Link>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Membro</TableHead>
                                    <TableHead>Conteúdo</TableHead>
                                    <TableHead>Data de envio</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {dashboard.messages.recentMemberMessages.map(msg => (
                                    <TableRow key={msg.id}>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <Avatar className="size-10">
                                                    <AvatarImage />
                                                </Avatar>
                                                <div className="flex flex-col">
                                                    <span>
                                                        {msg.chat.member.user.name}
                                                    </span>
                                                    <p className="text-xs text-muted-foreground truncate max-w-[250px]">
                                                        {msg.chat.member.user.email}
                                                    </p>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <p className="text-xs text-wrap text-left w-[250px] line-clamp-3">
                                                {msg.content}
                                            </p>
                                        </TableCell>
                                        <TableCell>
                                            {formatDate(msg.createdAt)}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </section>
        </div>
    )
}