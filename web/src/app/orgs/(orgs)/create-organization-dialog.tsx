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
import { HousePlus } from "lucide-react"

export function CreateOrganizationDialog() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>
                    <HousePlus className="mr-2 h-4 w-4" />
                    Adicionar Organização
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Adicionar Nova Organização</DialogTitle>
                    <DialogDescription>Preencha as informações abaixo</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Nome da Organização</Label>
                        <Input
                            id="name"
                            placeholder="Ex: Calendário Acadêmico 2025"
                        />
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