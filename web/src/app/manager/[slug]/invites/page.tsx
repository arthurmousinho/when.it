import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
    MoreVertical,
    X,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { getOrganizationInvites } from "@/http/invite/get-organization-invites.http";
import { formatDate } from "@/lib/utils";
import { MemberRoleBadge } from "@/components/member-role-badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { InviteMemberDialog } from "../members/invite-member-dialog";

type Props = {
    params: {
        slug: string;
    }
}

export default async function InvitesPage({ params: { slug } }: Props) {

    const { invites } = await getOrganizationInvites(slug);

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
                                <TableHead>Data de Envio</TableHead>
                                <TableHead className="text-right">Ações</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {invites.map(invites => (
                                <TableRow key={invites.id}>
                                    <TableCell>{invites.email}</TableCell>
                                    <TableCell>
                                        <MemberRoleBadge
                                            role={invites.role}
                                        />
                                    </TableCell>
                                    <TableCell>{formatDate(invites.sentAt)}</TableCell>
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