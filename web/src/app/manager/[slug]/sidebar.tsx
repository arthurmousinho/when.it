import {
    Gauge,
    Bot,
    Folder,
    UsersRound,
    Mail,
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
import logo from "@/assets/brand/horizontal-logo.svg"
import Link from "next/link"
import Image from "next/image"

type Props = {
    slug: string;
}

export function ManagerSidebar({ slug }: Props) {

    const links = [
        {
            href: `/manager/${slug}`,
            label: "Dashboard",
            icon: <Gauge size={20} />,
        },
        {
            href: `/manager/${slug}/chatbot`,
            label: "Chatbot",
            icon: <Bot size={20} />,
        },
        {
            href: `/manager/${slug}/documents`,
            label: "Documentos",
            icon: <Folder size={20} />,
        },
        {
            href: `/manager/${slug}/members`,
            label: "Membros",
            icon: <UsersRound size={20} />,
        },
        {
            href: `/manager/${slug}/invites`,
            label: "Convites",
            icon: <Mail size={20} />,
        },
    ]

    return (
        <Sidebar>
            <SidebarContent className="py-4">
                <header className="w-full px-4">
                    <Link href="/orgs" className="cursor pointer">
                        <Image src={logo} alt="when.it" width={150} height={50} />
                    </Link>
                </header>
                <SidebarGroup>
                    <SidebarGroupLabel>
                        Principal
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {links.map((link, index) => (
                                <SidebarMenuItem key={index}>
                                    <SidebarMenuButton isActive={false} className="cursor-pointer">
                                        <Link
                                            href={link.href}
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

