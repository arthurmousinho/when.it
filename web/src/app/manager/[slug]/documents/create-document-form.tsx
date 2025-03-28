import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { FilePlus } from "lucide-react"

export function CreateDocumentForm() {

    const categories = [
        "Institucional",
        "Manuais",
        "Planos de Aula",
        "Formulários",
        "Modelos",
        "Eventos",
        "Outros"
    ]

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>
                    <FilePlus className="mr-2 h-4 w-4" />
                    Adicionar Documento
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Adicionar Novo Documento</DialogTitle>
                    <DialogDescription>Preencha as informações e faça upload do documento</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Nome do Documento</Label>
                        <Input
                            id="name"
                            placeholder="Ex: Calendário Acadêmico 2025"
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="description">Descrição</Label>
                        <Textarea
                            id="description"
                            placeholder="Breve descrição do documento"
                            rows={3}
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="category">Categoria</Label>
                            <select
                                id="category"
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {categories.map((category) => (
                                    <option key={category} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="status">Visibilidade</Label>
                            <select
                                id="status"
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                <option value="public">Público</option>
                                <option value="private">Privado</option>
                                <option value="draft">Rascunho</option>
                            </select>
                        </div>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="file">Arquivo</Label>
                        <Input id="file" type="file" />
                    </div>
                    <div className="grid gap-2">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="tags">Tags</Label>
                            <div className="flex items-center gap-2">
                                <Input
                                    id="tags"
                                    placeholder="Adicionar tag"
                                    className="w-40"
                                />
                                <Button type="button" size="sm">
                                    Adicionar
                                </Button>
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-2">
                            
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline">
                        Cancelar
                    </Button>
                    <Button >Salvar</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}