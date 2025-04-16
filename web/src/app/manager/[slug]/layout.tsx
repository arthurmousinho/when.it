import type React from "react"
import { ManagerSidebar } from "./sidebar"
import { ManagerHeader } from "./header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

type ManagerLayoutProps = {
    children: React.ReactNode,
    params: {
        slug: string
    }
}

export default function ManagerLayout({ children, params: { slug } }: ManagerLayoutProps) {
    return (
        <SidebarProvider>
            <div className="flex flex-col h-screen w-full">
                <ManagerHeader currentOrganizationSlug={slug} />
                <div className="flex flex-1 overflow-hidden">
                    <ManagerSidebar slug={slug} />
                    <SidebarInset className="flex-1">
                        <div className="p-4 w-full bg-slate-50 h-full overflow-y-auto">
                            {children}
                        </div>
                    </SidebarInset>
                </div>
            </div>
        </SidebarProvider>
    )
}