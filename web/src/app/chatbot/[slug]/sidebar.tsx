import Link from "next/link"
import {  Plus } from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Logo } from "@/components/logo"

export function ChatbotSidebar() {
    return (
        <Sidebar className="border-r border-t-0 bg-white">
            <SidebarHeader>
                <Logo width={150} href="/orgs" />
                <Button className="w-full" variant="outline">
                    <Plus size={20} />
                    Nova conversa
                </Button>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>
                        Conversas recentes
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton className="cursor-pointer">
                                    <Link href="" className="text-sm text-muted-foreground truncate">
                                        2aafe35f-94ed-4499-b602-709454c7cfc3
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter className="border-t p-4">
                <div className="flex items-center gap-2">
                    <Avatar className="size-9 border">
                        <AvatarImage />
                    </Avatar>
                    <div className="flex flex-col items-start">
                        <span className="font-medium text-sm">Acme Inc</span>
                        <span className="text-muted-foreground text-xs">johndoe@email.com</span>
                    </div>
                </div>
            </SidebarFooter>
        </Sidebar>
    )
}

