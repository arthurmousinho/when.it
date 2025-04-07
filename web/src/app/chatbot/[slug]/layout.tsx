import { ChatbotSidebar } from "./sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"

type Props = {
    children: React.ReactNode
}

export default function MemberLayout({ children }: Props) {
    return (
        <div className="w-full bg-slate-50">
            <SidebarProvider className="w-full h-full flex flex-row">
                <ChatbotSidebar />
                {children}
            </SidebarProvider>
        </div>
    )
}