import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
    Search,
    Filter,
    MoreVertical,
    Download,
    Pencil,
    Trash2,
    Eye,
    FileText,
    File,
    Bot,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { UploadDocumentForm } from "./upload-document-form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getOrganizationDocuments } from "@/http/documents/get-organization-documents.http";
import { formatBytes, formatDate } from "@/lib/utils";
import { EmbedDocumentConfirmation } from "./embed-document-confirmation";
import { DocumentStatusBadge } from "./document-status-badge";
import { IconCard } from "@/components/icon-card";
import type { DocumentType } from "@/@types/document";

import documentsImage from "@/assets/illustrations/documents.svg";

function getFileIcon(type: DocumentType) {
    switch (type) {
        case "PDF":
            return <FileText className="size-6 text-primary" />
        default:
            return <File className="size-6 text-primary" />
    }
}

type Props = {
    params: {
        slug: string;
    }
}

export default async function DocumentsPage({ params: { slug } }: Props) {

    const { documents } = await getOrganizationDocuments(slug);

    if (documents.length === 0) {
        return (
            <div className="flex items-center justify-center w-full mt-20">
                <main className="flex flex-row items-center gap-10">
                    <Image
                        src={documentsImage}
                        width={250}
                        alt="No organizations"
                        className="mx-auto"
                    />
                    <div className="space-y-4 max-w-[500px]">
                        <h3 className="text-xl font-semibold tracking-tight">
                            Nenhum documento encontrado
                        </h3>
                        <p className="text-muted-foreground text-base">
                            Você ainda não possui nenhum documento enviado. Faça o upload de um documento e integre-o para ser utilizado no chatbot da sua organização
                        </p>
                        <UploadDocumentForm />
                    </div>
                </main>
            </div>
        )
    }

    return (
        <div className="w-full space-y-4">
            <header className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Documentos</h2>
                    <p className="text-muted-foreground">Gerencie todos os documentos da sua organização.</p>
                </div>
                <UploadDocumentForm />
            </header>
            <header className="flex flex-col gap-4 md:flex-row md:items-center w-full">
                <div className="relative flex-1">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Pesquisar documentos..." className="pl-8" />
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
                    <Select defaultValue="all">
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Todos os Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Todos os Status</SelectItem>
                            <SelectItem value="public">Público</SelectItem>
                            <SelectItem value="private">Privado</SelectItem>
                            <SelectItem value="draft">Rascunho</SelectItem>
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
                                <TableHead className="w-[300px]">Nome</TableHead>
                                <TableHead>Tamanho</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Data de Upload</TableHead>
                                <TableHead className="text-right">Ações</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {documents.map((doc, index) => (
                                <TableRow key={index}>
                                    <TableCell className="font-medium">
                                        <div className="flex items-center gap-2">
                                            <IconCard>
                                                {getFileIcon(doc.fileType)}
                                            </IconCard>
                                            <div className="flex flex-col gap-1">
                                                <span>
                                                    {doc.name}
                                                </span>
                                                <p className="text-xs text-muted-foreground truncate max-w-[250px]">
                                                    {doc.description}
                                                </p>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        {formatBytes(doc.fileSize)}
                                    </TableCell>
                                    <TableCell>
                                        <DocumentStatusBadge status={doc.status} />
                                    </TableCell>
                                    <TableCell>
                                        {formatDate(doc.uploadedAt)}
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
                                                <DropdownMenuItem asChild>
                                                    <Link href={`/manager/${slug}/documents/${doc.id}`}>
                                                        <Eye className="mr-2 h-4 w-4" />
                                                        Visualizar
                                                    </Link>
                                                </DropdownMenuItem>
                                                <EmbedDocumentConfirmation documentId={doc.id}>
                                                    <DropdownMenuItem>
                                                        <Bot className="mr-2 h-4 w-4" />
                                                        Integrar
                                                    </DropdownMenuItem>
                                                </EmbedDocumentConfirmation>
                                                <DropdownMenuItem>
                                                    <Pencil className="mr-2 h-4 w-4" />
                                                    Editar
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="text-destructive">
                                                    <Trash2 className="mr-2 h-4 w-4 text-destructive" />
                                                    Excluir
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