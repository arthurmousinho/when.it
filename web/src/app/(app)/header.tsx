import logo from "@/assets/brand/horizontal-logo.svg"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

export function Header() {
    return (
        <header className="w-full border-b flex justify-center p-2">
            <div className="w-full max-w-[1200px] flex justify-between items-center">
                <Image src={logo} alt="when.it" width={150} height={100} />
                <nav className="space-x-2">
                    <Button asChild>
                        <Link href="/auth/signup">
                            Criar conta
                        </Link>
                    </Button>
                    <Button variant="secondary">
                        <Link href="/auth/login">
                            Login
                        </Link>
                    </Button>
                </nav>
            </div>
        </header>
    )
}