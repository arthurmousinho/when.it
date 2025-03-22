import type React from "react"
import { ManagerSidebar } from "./(manager)/sidebar"
import { ManagerHeader } from "./(manager)/header"

type ManagerLayoutProps = {
    children: React.ReactNode
}

export default function ManagerLayout({ children }: ManagerLayoutProps) {
    return (
        <div className="flex w-full">
            <ManagerSidebar />
            <main className="w-full">
                <ManagerHeader />
                <div className="p-4 w-full">{children}</div>
            </main>
        </div>
    )
}