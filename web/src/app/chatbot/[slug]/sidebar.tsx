import Link from "next/link";
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
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Logo } from "@/components/logo";
import { getMemberChats } from "@/http/chat/get-member-chats.http";
import { getUserMembership } from "@/http/member/get-user-membership.http";
import { NewChatForm } from "./new-chat-form";
import { isToday, isYesterday, subDays } from "date-fns";

type Props = {
    slug: string;
};

export async function ChatbotSidebar({ slug }: Props) {
    const { chats } = await getMemberChats(slug);
    const { member } = await getUserMembership(slug);

    const todayChats = chats.filter((chat) => isToday(new Date(chat.createdAt)));
    const yesterdayChats = chats.filter((chat) => isYesterday(new Date(chat.createdAt)));

    const last7DaysChats = chats.filter((chat) => {
        const chatDate = new Date(chat.createdAt);
        const sevenDaysAgo = subDays(new Date(), 7);

        return !isToday(chatDate) &&
            !isYesterday(chatDate) &&
            chatDate >= sevenDaysAgo;
    });

    const olderChats = chats.filter((chat) => {
        const chatDate = new Date(chat.createdAt);
        const sevenDaysAgo = subDays(new Date(), 7);

        return chatDate < sevenDaysAgo;
    });

    return (
        <Sidebar className="border-r border-t-0 bg-white">
            <SidebarHeader>
                <Logo width={150} href="/orgs" />
                <NewChatForm slug={slug} />
            </SidebarHeader>
            <SidebarContent>
                {todayChats.length > 0 && (
                    <SidebarGroup>
                        <SidebarGroupLabel>Hoje</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {todayChats.map((chat) => (
                                    <SidebarMenuItem key={chat.id}>
                                        <Link href={`/chatbot/${slug}/${chat.id}`}>
                                            <SidebarMenuButton className="cursor-pointer truncate text-muted-foreground">
                                                {chat.id}
                                            </SidebarMenuButton>
                                        </Link>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                )}

                {yesterdayChats.length > 0 && (
                    <SidebarGroup>
                        <SidebarGroupLabel>Ontem</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {yesterdayChats.map((chat) => (
                                    <SidebarMenuItem key={chat.id}>
                                        <Link href={`/chatbot/${slug}/${chat.id}`}>
                                            <SidebarMenuButton className="cursor-pointer truncate text-muted-foreground">
                                                {chat.id}
                                            </SidebarMenuButton>
                                        </Link>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                )}

                {last7DaysChats.length > 0 && (
                    <SidebarGroup>
                        <SidebarGroupLabel>Últimos 7 dias</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {last7DaysChats.map((chat) => (
                                    <SidebarMenuItem key={chat.id}>
                                        <Link href={`/chatbot/${slug}/${chat.id}`}>
                                            <SidebarMenuButton className="cursor-pointer truncate text-muted-foreground">
                                                {chat.id}
                                            </SidebarMenuButton>
                                        </Link>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                )}

                {olderChats.length > 0 && (
                    <SidebarGroup>
                        <SidebarGroupLabel>Mais antigos</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {olderChats.map((chat) => (
                                    <SidebarMenuItem key={chat.id}>
                                        <Link href={`/chatbot/${slug}/${chat.id}`}>
                                            <SidebarMenuButton className="cursor-pointer truncate text-muted-foreground">
                                                {chat.id}
                                            </SidebarMenuButton>
                                        </Link>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                )}
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
    );
}