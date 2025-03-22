import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
    FileText,
    Search,
    Filter,
    MoreVertical,
    Download,
    Pencil,
    Trash2,
    Eye,
    FileImage,
    FileSpreadsheet,
    FileArchive,
    FileCode,
    FileAudio,
    FileVideo,
    File,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { documentsMock } from "@/mocks/documets.mock"
import { CreateDocumentForm } from "./create-document-form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const getFileIcon = (type: string) => {
    switch (type) {
        case "pdf":
            return <FileText className="size-6 text-muted-foreground" />
        case "doc":
        case "docx":
            return <FileText className="size-6 text-muted-foreground" />
        case "xls":
        case "xlsx":
            return <FileSpreadsheet className="size-6 text-muted-foreground" />
        case "jpg":
        case "png":
        case "gif":
            return <FileImage className="size-6 text-muted-foreground" />
        case "zip":
        case "rar":
            return <FileArchive className="size-6 text-muted-foreground" />
        case "mp3":
        case "wav":
            return <FileAudio className="size-6 text-muted-foreground" />
        case "mp4":
        case "avi":
            return <FileVideo className="size-6 text-muted-foreground" />
        case "html":
        case "js":
        case "css":
            return <FileCode className="size-6 text-muted-foreground" />
        default:
            return <File className="size-6 text-muted-foreground" />
    }
}

export default function DocumentsPage() {
    return (
        <div className="w-full space-y-4">
            <header className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Documentos</h2>
                    <p className="text-muted-foreground">Gerencie todos os documentos da sua instituição.</p>
                </div>
                <CreateDocumentForm />
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
                                <TableHead>Categoria</TableHead>
                                <TableHead>Tamanho</TableHead>
                                <TableHead>Data</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Ações</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {documentsMock.map((doc, index) => (
                                <TableRow key={index}>
                                    <TableCell className="font-medium py-4">
                                        <div className="flex items-center gap-2">
                                            {getFileIcon(doc.type)}
                                            <div>
                                                <span>{doc.name}</span>
                                                <p className="text-xs text-muted-foreground truncate max-w-[250px] ">{doc.description}</p>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>{doc.category}</TableCell>
                                    <TableCell>{doc.size}</TableCell>
                                    <TableCell>{doc.uploadDate}</TableCell>
                                    <TableCell>
                                        <Badge
                                            variant={doc.status === "public" ? "default" : doc.status === "private" ? "secondary" : "outline"}
                                        >
                                            {doc.status === "public" ? "Público" : doc.status === "private" ? "Privado" : "Rascunho"}
                                        </Badge>
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
                                                <DropdownMenuItem>
                                                    <Eye className="mr-2 h-4 w-4" />
                                                    Visualizar
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
                                                    <Download className="mr-2 h-4 w-4" />
                                                    Download
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem>
                                                    <Pencil className="mr-2 h-4 w-4" />
                                                    Editar
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="text-destructive">
                                                    <Trash2 className="mr-2 h-4 w-4" />
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

