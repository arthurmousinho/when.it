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
            <div className="flex flex-col w-full h-screen overflow-hidden bg-slate-50">
                <ManagerHeader />
                <main className="w-full h-full flex flex-row">
                    <ManagerSidebar slug={slug} />
                    <SidebarInset className="overflow-y-auto">
                        <div className="p-4 w-full">
                            {children}
                        </div>
                    </SidebarInset>
                </main>
            </div>
        </SidebarProvider>
    )
}