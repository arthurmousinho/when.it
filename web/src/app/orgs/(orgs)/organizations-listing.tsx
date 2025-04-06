import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Search,
    Filter,
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { OrganizationCard } from "./organization-card"
import { getUserOrganizations } from "@/http/organization/get-user-organizations.http"
import { CreateOrganizationDialog } from "./create-organization-dialog"

import emptyImage from "@/assets/illustrations/organization.svg"
import Image from "next/image"

export async function OrganizationsListing() {

    const { organizations } = await getUserOrganizations();

    if (organizations.length === 0) {
        return (
            <div className="flex items-center justify-center w-full mt-20">
                <main className="flex flex-row items-center gap-10">
                    <Image
                        src={emptyImage}
                        width={250}
                        alt="No organizations"
                        className="mx-auto"
                    />
                    <div className="space-y-4 max-w-[500px]">
                        <h3 className="text-xl font-semibold tracking-tight">
                            Nenhuma organização encontrada
                        </h3>
                        <p className="text-muted-foreground text-base">
                            Você ainda não possui nenhuma organização. Crie sua primeira para comerçar a o seu chatbot.
                        </p>
                        <CreateOrganizationDialog />
                    </div>
                </main>
            </div>
        )
    }

    return (
        <div className="w-full space-y-4">
            <header className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">
                        Organizações
                    </h2>
                    <p className="text-muted-foreground">
                        Gerencie todos os documentos da sua instituição.
                    </p>
                </div>
                <CreateOrganizationDialog />
            </header>
            <header className="flex flex-col gap-4 md:flex-row md:items-center w-full">
                <div className="relative flex-1">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Pesquisar organização..." className="pl-8" />
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
            <main className="grid grid-cols-4 gap-4">
                {organizations.map(org => (
                    <OrganizationCard
                        key={org.id}
                        name={org.name}
                        description={org.description}
                        slug={org.slug}
                        chatsCount={org.chatsCount}
                        role={org.role}
                    />
                ))}
            </main>
        </div>
    )
}