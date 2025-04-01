import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { getDocument } from "@/http/documents/get-document.http"
import { formatBytes, formatDate } from "@/lib/utils"
import { DocumentStatusBadge } from "../document-status-badge"
import { Badge } from "@/components/ui/badge"
import { Bot, FileText, Pencil, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { EmbedDocumentConfirmation } from "../embed-document-confirmation"
import { Separator } from "@/components/ui/separator"

type Props = {
    params: {
        id: string
    }
}

export default async function DocumentPage({ params: { id } }: Props) {

    const { document } = await getDocument(id)

    return (
        <div className="w-full">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div className="flex flex-row items-center gap-2">
                        <div className="border p-3 rounded-md text-primary bg-primary/10">
                            <FileText />
                        </div>
                        <CardTitle className="text-xl">
                            {document.name}
                        </CardTitle>
                    </div>
                    <nav className="flex flex-row items-center gap-2">
                        {document.status === 'UPLOADED' && (
                            <EmbedDocumentConfirmation documentId={document.id}>
                                <Button variant="outline">
                                    <Bot className="size-4" />
                                    Integrar
                                </Button>
                            </EmbedDocumentConfirmation>
                        )}
                        <Button variant="outline">
                            <Pencil size={20} />
                            Editar
                        </Button>
                        <Button variant="outline">
                            <Trash size={20} />
                            Excluir
                        </Button>
                    </nav>
                </CardHeader>
                <div className="px-4">
                    <Separator className="w-full" />
                </div>
                <CardContent className="grid grid-cols-3 gap-4">
                    <div>
                        <h4 className="text-sm font-medium">Nome</h4>
                        <p className="text-sm mt-1 text-muted-foreground">
                            {document.name}
                        </p>
                    </div>
                    <div>
                        <h4 className="text-sm font-medium">Descrição</h4>
                        <p className="text-sm mt-1 text-muted-foreground">
                            {document.description}
                        </p>
                    </div>
                    <div>
                        <h4 className="text-sm font-medium">Status</h4>
                        <div className="mt-1">
                            <DocumentStatusBadge status={document.status} />
                        </div>
                    </div>
                    <div>
                        <h4 className="text-sm font-medium">Data de Envio</h4>
                        <p className="text-sm mt-1 text-muted-foreground">
                            {formatDate(document.uploadedAt)}
                        </p>
                    </div>
                    <div>
                        <h4 className="text-sm font-medium">Data de Atualização</h4>
                        <p className="text-sm mt-1 text-muted-foreground">
                            {formatDate(document.updatedAt)}
                        </p>
                    </div>
                    <div>
                        <h4 className="text-sm font-medium">Tamanho</h4>
                        <p className="text-sm mt-1 text-muted-foreground">
                            {formatBytes(document.fileSize)}
                        </p>
                    </div>
                    <div>
                        <h4 className="text-sm font-medium">Tipo</h4>
                        <Badge variant="outline" className="mt-1">
                            {document.fileType}
                        </Badge>
                    </div>
                    <div>
                        <h4 className="text-sm font-medium">ID do Arquivo</h4>
                        <pre className="text-sm text-muted-foreground mt-1">
                            {document.fileId}
                        </pre>
                    </div>
                    <div>
                        <h4 className="text-sm font-medium">ID do Documento</h4>
                        <pre className="text-sm text-muted-foreground mt-1">
                            {document.id}
                        </pre>
                    </div>
                </CardContent>
                <CardFooter>
                    <iframe src={document.fileUrl} className="w-full h-[600px] rounded-md" />
                </CardFooter>
            </Card>
        </div>
    )
}

