import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { LogOut, Menu, Settings, UserRound } from "lucide-react";

export function ManagerHeader() {
    return (
        <header className="border-b p-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Button variant="outline" size="icon">
                        <Menu size={20} />
                    </Button>
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage>Documentos</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
                <nav className="flex items-center gap-4">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <div className="flex items-center gap-2 min-w-full cursor-pointer">
                                <Avatar className="size-10">
                                    <AvatarImage
                                        src="https://github.com/arthurmousinho.png"
                                        alt="Avatar"
                                    />
                                    <AvatarFallback>
                                        AM
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex flex-col items-start">
                                    <span className="font-medium text-sm">
                                        Arthur Mousinho
                                    </span>
                                    <span className="text-muted-foreground text-xs">
                                        arthur.mousinho@grupocev.com
                                    </span>
                                </div>
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56">
                            <DropdownMenuItem>
                                <UserRound className="mr-2 h-4 w-4" />
                                <span>Meu Perfil</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Settings className="mr-2 h-4 w-4" />
                                <span>Configurações</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <LogOut className="mr-2 h-4 w-4" />
                                Sair
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </nav>
            </div>
        </header>
    )
}