import { ManagerSidebar } from "./(manager)/sidebar";


type ManagerLayoutProps = {
    children: React.ReactNode;
}

export default function ManagerLayout({ children }: ManagerLayoutProps) {
    return (
        <div className="flex w-full">
            <ManagerSidebar />
            <main className="p-4 w-full flex-1">
                {children}
            </main>
        </div>
    )
}