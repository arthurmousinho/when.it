import {
    Gauge,
    Bot,
    Folder,
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
    return (
        <Sidebar>
            <SidebarContent className="py-4">
                <header className="w-full px-4">
                    <Image
                        src={logo}
                        alt="when.it"
                        width={150}
                        height={50}
                    />
                </header>
                <SidebarGroup>
                    <SidebarGroupLabel>
                        Principal
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton isActive={false} className="cursor-pointer">
                                    <Link
                                        href={`/manager/${slug}`}
                                        className="flex items-center gap-2 min-w-full"
                                    >
                                        <Gauge size={20} />
                                        <span>Dashboard</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton isActive={false} className="cursor-pointer">
                                    <Link 
                                        href={`/manager/${slug}/chatbot`}
                                        className="flex items-center gap-2 min-w-full"
                                    >
                                        <Bot size={20} />
                                        <span>Chat-bot</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    isActive={false}
                                    className="cursor-pointer"
                                >
                                    <Link
                                        href={`/manager/${slug}/documents`}
                                        className="flex items-center gap-2 min-w-full"
                                    >
                                        <Folder size={20} />
                                        <span>Documentos</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}

