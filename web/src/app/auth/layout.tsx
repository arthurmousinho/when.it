import { Logo } from "@/components/logo"

type AuthLayoutProps = {
    children: React.ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
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