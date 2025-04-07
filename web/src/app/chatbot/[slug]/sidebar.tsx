import Link from "next/link";

import { Plus } from "lucide-react";
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
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Logo } from "@/components/logo";
import { getMemberChats } from "@/http/chat/get-member-chats.http";
import { getUserMembership } from "@/http/member/get-user-membership.http";

type Props = {
    slug: string
}

export async function ChatbotSidebar({ slug }: Props) {

    const { chats } = await getMemberChats(slug)
    const { member } = await getUserMembership(slug);

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
                            {chats.map(chat => (
                                <SidebarMenuItem key={chat.id}>
                                    <Link href={`chatbot/${slug}/${chat.id}`}>
                                        <SidebarMenuButton className="cursor-pointer truncate text-muted-foreground">
                                            {chat.organizationId}
                                        </SidebarMenuButton>
                                    </Link>
                                </SidebarMenuItem>
                            ))}
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
                        <span className="font-medium text-sm">
                            {member.organization.name}
                        </span>
                        <span className="text-muted-foreground text-xs">
                            {member.user.email}
                        </span>
                    </div>
                </div>
            </SidebarFooter>
        </Sidebar>
    )
}

