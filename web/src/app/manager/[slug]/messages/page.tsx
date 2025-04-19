import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
    Search,
    Filter,
    X,
    MoreVertical,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDate, getInitials } from "@/lib/utils";
import { getOrganizationMessages } from "@/http/message/get-organization-messages.http";
import { MessageAuthorTypeBadge } from "./message-author-type-badge";
import { Paginator } from "@/components/paginator";

type Props = {
    params: {
        slug: string
    },
    searchParams: { [key: string]: string | undefined };
}

export default async function MessagesPage({ params: { slug }, searchParams }: Props) {

    const currentPage = parseInt((searchParams.page as string) || '1');
    const currentLimit = parseInt((searchParams.limit as string) || '10');

    const { data, meta } = await getOrganizationMessages({
        organizationSlug: slug,
        page: currentPage,
        limit: currentLimit
    });

    return (
        <div className="w-full space-y-4">
            <header className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">
                        Mensagens
                    </h2>
                    <p className="text-muted-foreground">
                        Gerencie todas as mensagens do chatbot da sua organização.
                    </p>
                </div>
            </header>
            <header className="flex flex-col gap-4 md:flex-row md:items-center w-full">
                <div className="relative flex-1">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Pesquisar membros..." className="pl-8" />
                </div>
                <div className="flex gap-2">
                    <Select defaultValue="all">
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Todas as Categorias" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Todas as Categorias</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button variant="secondary" className="border">
                        <Filter className="h-4 w-4" />
                        Filtrar
                    </Button>
                </div>
            </header>
            <Card>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Usuário</TableHead>
                                <TableHead>Conteúdo</TableHead>
                                <TableHead>Autor</TableHead>
                                <TableHead>Data de Criação</TableHead>
                                <TableHead className="text-right">Ações</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data.map(message => (
                                <TableRow key={message.id}>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <Avatar className="size-10">
                                                <AvatarImage />
                                                <AvatarFallback>
                                                    {getInitials(message.chat.member.user.name)}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="flex flex-col">
                                                <span>
                                                    {message.chat.member.user.name}
                                                </span>
                                                <p className="text-xs text-muted-foreground truncate max-w-[250px]">
                                                    {message.chat.member.user.email}
                                                </p>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <p className="text-xs text-wrap text-left w-[200px] line-clamp-2">
                                            {message.content}
                                        </p>
                                    </TableCell>
                                    <TableCell>
                                        <MessageAuthorTypeBadge
                                            authorType={message.authorType}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        {formatDate(message.createdAt)}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="outline" size="icon">
                                                    <MoreVertical className="h-4 w-4" />
                                                    <span className="sr-only">Ações</span>
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuLabel>Ações</DropdownMenuLabel>
                                                <DropdownMenuItem className="text-destructive">
                                                    <X className="mr-2 size-4 text-destructive" />
                                                    Exluir
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TableCell colSpan={5}>
                                    <Paginator
                                        showing={data.length}
                                        meta={meta}
                                        basePath={`/manager/${slug}/messages`}
                                    />
                                </TableCell>
                            </TableRow>
                        </TableFooter>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}