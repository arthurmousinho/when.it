import { ManagerSidebar } from "./sidebar";

type ManagerLayoutProps = {
    children: React.ReactNode;
}

export default function ManagerLayout({ children }: ManagerLayoutProps) {
    return (
        <div>
            <ManagerSidebar />
           {children}
        </div>
    )
}