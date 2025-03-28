import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Search,
    Filter,
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { OrganizationCard } from "./organization-card"
import { getUserOrganizations } from "@/http/organization/get-user-organizations.http"
import { auth } from "@/app/auth/(auth)/auth"
import { CreateOrganizationDialog } from "./create-organization-dialog"

export async function OrganizationsListing() {

    const { user } = await auth();
    const { organizations } = await getUserOrganizations();

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
            <main className="grid grid-cols-3 gap-4">
                {organizations.map(org => (
                    <OrganizationCard
                        key={org.id}
                        name={org.name}
                        membersCount={org.membersCount}
                        documentsCount={org.documentsCount}
                        chatsCount={org.chatsCount}
                        isManager={org.manager.user.id === user.id}
                    />
                ))}
            </main>
        </div>
    )
}