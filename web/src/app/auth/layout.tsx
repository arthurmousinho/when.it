import { Logo } from "@/components/logo"
import { isAuthenticated } from "./(auth)/auth";
import { redirect } from "next/navigation";

type AuthLayoutProps = {
    children: React.ReactNode
}

export default async function AuthLayout({ children }: AuthLayoutProps) {

    const isUserAuthenticated = await isAuthenticated();

    if (isUserAuthenticated) {
        redirect('/orgs');
    }

    return (
        <div className="h-dvh w-full flex items-center justify-center">
            <div className="fixed left-10 top-10">
                <Logo />
            </div>
            <main className="w-[500px]">
                {children}
            </main>
        </div>
    )
}