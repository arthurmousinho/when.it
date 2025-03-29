import type React from "react"
import { ManagerSidebar } from "./sidebar"
import { ManagerHeader } from "./header"

type ManagerLayoutProps = {
    children: React.ReactNode,
    params: {
        slug: string
    }
}

export default function ManagerLayout({ children, params: { slug } }: ManagerLayoutProps) {
    return (
        <div className="flex w-full">
            <ManagerSidebar slug={slug} />
            <main className="w-full h-full">
                <ManagerHeader />
                <div className="p-4">
                    {children}
                </div>
            </main>
        </div>
    )
}