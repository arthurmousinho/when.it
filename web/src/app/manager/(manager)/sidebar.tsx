import {
    UsersRound,
    Gauge,
    LogOut,
    Bot,
    GraduationCap,
    Folder,
    Settings,
    BookOpen,
    UserCog,
    User,
    ChevronUp,
} from "lucide-react"
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import logo from "@/assets/brand/horizontal-logo.svg"
import Link from "next/link"
import Image from "next/image"

const user = {
    name: "John Doe",
    email: "johndoe@somosicev.com",
    avatarUrl: "https://github.com/arthurmousinho.png",
}

export function ManagerSidebar() {
    return (
        <Sidebar>
            <SidebarContent className="bg-white py-4">
                <header className="w-full px-4">
                    <Image src={logo || "/placeholder.svg"} alt="Logo" width={150} height={50} />
                </header>
                <SidebarGroup>
                    <SidebarGroupLabel>Principal</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton isActive={false} className="cursor-pointer">
                                    <Link href="/" className="flex items-center gap-2 min-w-full">
                                        <Gauge size={20} />
                                        <span>Dashboard</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton isActive={false} className="cursor-pointer">
                                    <Link href="chatbot" className="flex items-center gap-2 min-w-full">
                                        <Bot size={20} />
                                        <span>Chat-bot</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarGroup>
                    <SidebarGroupLabel>Conteúdo</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton 
                                    isActive={false} 
                                    className="cursor-pointer"
                                >
                                    <Link 
                                        href="/manager/documents" 
                                        className="flex items-center gap-2 min-w-full"
                                    >
                                        <Folder size={20} />
                                        <span>Documentos</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton isActive={false} className="cursor-pointer">
                                    <Link href="/materiais" className="flex items-center gap-2 min-w-full">
                                        <BookOpen size={20} />
                                        <span>Materiais Didáticos</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarGroup>
                    <SidebarGroupLabel>Administração</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton isActive={false} className="cursor-pointer">
                                    <Link href="/admin/users" className="flex items-center gap-2 min-w-full">
                                        <UsersRound size={20} />
                                        <span>Estudantes</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton isActive={false} className="cursor-pointer">
                                    <Link href="/admin/products" className="flex items-center gap-2 min-w-full">
                                        <GraduationCap size={20} />
                                        <span>Instituição</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton isActive={false} className="cursor-pointer">
                                    <Link href="/admin/gestores" className="flex items-center gap-2 min-w-full">
                                        <UserCog size={20} />
                                        <span>Gestores</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarGroup className="mt-auto">
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <SidebarMenuButton className="cursor-pointer h-10">
                                            <div className="flex items-center gap-2 min-w-full">
                                                <Avatar className="size-10">
                                                    <AvatarImage src={user.avatarUrl} alt={user.name} />
                                                    <AvatarFallback>
                                                        <User size={16} />
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div className="flex flex-col items-start">
                                                    <span className="font-medium text-sm">
                                                        {user.name}
                                                    </span>
                                                    <span className="text-muted-foreground text-xs">
                                                        {user.email}
                                                    </span>
                                                </div>
                                                <ChevronUp className="ml-auto h-4 w-4" />
                                            </div>
                                        </SidebarMenuButton>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="w-56">
                                        <div className="flex items-center justify-start gap-2 p-2">
                                            <Avatar>
                                                <AvatarImage src={user.avatarUrl} alt={user.name} />
                                                <AvatarFallback>
                                                    <User />
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="flex flex-col">
                                                <span className="font-medium">
                                                    {user.name}
                                                </span>
                                                <span className="text-xs text-muted-foreground">
                                                    {user.email}
                                                </span>
                                            </div>
                                        </div>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem>
                                            <User className="mr-2 h-4 w-4" />
                                            <span>Meu Perfil</span>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <Settings className="mr-2 h-4 w-4" />
                                            <span>Configurações</span>
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem className="text-destructive">
                                            <LogOut className="mr-2 h-4 w-4" />
                                            <span>Sair</span>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}

