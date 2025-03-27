import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ChevronDown, LogOut, LogOutIcon, Settings, UserRound } from "lucide-react";
import { auth } from "./auth";

function getInitials(name: string): string {
    const initials = name
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase())
        .slice(0, 2)
        .join('')

    return initials
}

export async function ProfileButton() {

    const { user } = await auth();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div className="flex items-center gap-2 cursor-pointer">
                    <Avatar className="size-10">
                        <AvatarFallback>
                            {getInitials(user.name)}
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
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <a href="/auth/signout" className="flex flex-row items-center text-destructive w-full h-full">
                        <LogOut className="mr-2 h-4 w-4 text-destructive" />
                        Sair
                    </a>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}