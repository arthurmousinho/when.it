import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
    Mail,
    MoreVertical,
    X,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { getOrganizationInvites } from "@/http/invite/get-organization-invites.http";
import { formatDate } from "@/lib/utils";
import { MemberRoleBadge } from "@/components/member-role-badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { InviteMemberDialog } from "../members/invite-member-dialog";
import { InviteStatusBadge } from "./invite-status-badge";
import { IconCard } from "@/components/icon-card";

import inviteImagem from "@/assets/illustrations/invite.svg";

type Props = {
    params: {
        slug: string;
    }
}

export default async function InvitesPage({ params: { slug } }: Props) {

    const { invites } = await getOrganizationInvites(slug);

    if (invites.length === 0) {
        return (
            <div className="flex items-center justify-center w-full mt-20">
                <main className="flex flex-row items-center gap-10">
                    <Image
                        src={inviteImagem}
                        width={250}
                        alt="No invites"
                        className="mx-auto"
                    />
                    <div className="space-y-4 max-w-[500px]">
                        <h3 className="text-xl font-semibold tracking-tight">
                            Nenhuma convite encontrado
                        </h3>
                        <p className="text-muted-foreground text-base">
                            Você ainda não enviou nenhum convite para esta organização. Convite um membro
                            para participar
                        </p>
                        <InviteMemberDialog />
                    </div>
                </main>
            </div>
        )
    }

    return (
        <div className="w-full space-y-4">
            <header className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Convites</h2>
                    <p className="text-muted-foreground">Gerencie todos os convites para a sua organização.</p>
                </div>
                <InviteMemberDialog />
            </header>
            <Card>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Email</TableHead>
                                <TableHead>Cargo</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Ações</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {invites.map(invite => (
                                <TableRow key={invite.id}>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <IconCard>
                                                <Mail className="size-6" />
                                            </IconCard>
                                            <div className="flex flex-col gap-1">
                                                <span>
                                                    {invite.email}
                                                </span>
                                                <p className="text-xs text-muted-foreground truncate max-w-[250px]">
                                                    {formatDate(invite.sentAt)}
                                                </p>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <MemberRoleBadge
                                            role={invite.role}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <InviteStatusBadge
                                            status={invite.status}
                                        />
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
                                                    Cancelar
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )

}