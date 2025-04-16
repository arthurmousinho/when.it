import {
    Gauge,
    Bot,
    Folder,
    UsersRound,
    Mail,
    MessagesSquare,
    MessageSquareText,
    Building,
    Settings,
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
import Link from "next/link"

type Props = {
    slug: string;
}

export function ManagerSidebar({ slug }: Props) {

    const mainLinks = [
        {
            href: `/manager/${slug}`,
            label: "Dashboard",
            target: "_self",
            icon: <Gauge size={20} />,
        },
    ]

    const organizationLinks = [
        {
            href: `/manager/${slug}/members`,
            label: "Membros",
            target: "_self",
            icon: <UsersRound size={20} />,
        },
        {
            href: `/manager/${slug}/invites`,
            label: "Convites",
            target: "_self",
            icon: <Mail size={20} />,
        },
        {
            href: `/manager/${slug}/org`,
            label: "Minha Organização",
            target: "_self",
            icon: <Building size={20} />,
        },
    ]

    const chatbotLinks = [
        {
            href: `/chatbot/${slug}`,
            target: "_blank",
            label: "Chatbot",
            icon: <Bot size={20} />,
        },
        {
            href: `/manager/${slug}/chats`,
            target: "_self",
            label: "Conversas",
            icon: <MessagesSquare size={20} />,
        },
        {
            href: `/manager/${slug}/messages`,
            label: "Mensagens",
            target: "_self",
            icon: <MessageSquareText size={20} />,
        },
        {
            href: `/manager/${slug}/documents`,
            label: "Documentos",
            target: "_self",
            icon: <Folder size={20} />,
        },
        {
            href: `/manager/${slug}/documents`,
            label: "Configurações",
            target: "_self",
            icon: <Settings size={20} />,
        },
    ]

    return (
        <Sidebar className="bg-white">
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>
                        Principal
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {mainLinks.map((link, index) => (
                                <SidebarMenuItem key={index}>
                                    <SidebarMenuButton isActive={false} className="cursor-pointer">
                                        <Link
                                            href={link.href}
                                            target={link.target}
                                            className="flex items-center gap-2 min-w-full"
                                        >
                                            {link.icon}
                                            {link.label}
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarGroup>
                    <SidebarGroupLabel>
                        Organização
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {organizationLinks.map((link, index) => (
                                <SidebarMenuItem key={index}>
                                    <SidebarMenuButton asChild className="cursor-pointer">
                                        <Link
                                            href={link.href}
                                            target={link.target}
                                            className="flex items-center gap-2 min-w-full min-h-full"
                                        >
                                            {link.icon}
                                            {link.label}
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarGroup>
                    <SidebarGroupLabel>
                        Chatbot
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {chatbotLinks.map((link, index) => (
                                <SidebarMenuItem key={index}>
                                    <SidebarMenuButton isActive={false} className="cursor-pointer">
                                        <Link
                                            href={link.href}
                                            target={link.target}
                                            className="flex items-center gap-2 min-w-full"
                                        >
                                            {link.icon}
                                            {link.label}
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}

