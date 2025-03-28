'use client'

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { HousePlus } from "lucide-react"
import { OrganizationForm } from "./organization-form"

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
                <OrganizationForm />
            </DialogContent>
        </Dialog>
    )
}