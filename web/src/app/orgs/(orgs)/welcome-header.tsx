import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { LogOut, Settings, UserRound } from "lucide-react";
import logo from "@/assets/brand/horizontal-logo.svg";

export function WelcomeHeader() {
    return (
        <header className="border-b p-4 px-10">
            <div className="flex items-center justify-between">
                <Image src={logo} alt="Logo" width={150} height={50} />
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