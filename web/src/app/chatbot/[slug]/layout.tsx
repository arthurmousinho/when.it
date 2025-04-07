import { ChatbotSidebar } from "./sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"

type Props = {
    children: React.ReactNode,
    params: {
        slug: string
    }
}

export default function MemberLayout({ children, params }: Props) {
    return (
        <div className="w-full bg-slate-50">
            <SidebarProvider className="w-full h-full flex flex-row">
                <ChatbotSidebar slug={params.slug} />
                {children}
            </SidebarProvider>
        </div>
    )
}