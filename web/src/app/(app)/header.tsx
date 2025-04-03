import logo from "@/assets/brand/horizontal-logo.svg"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export function Header() {
    return (
        <header className="w-full border-b flex justify-center p-2">
            <div className="w-full max-w-[1200px] flex justify-between items-center">
                <Image src={logo} alt="when.it" width={150} height={100} />
                <nav className="space-x-2">
                    <Button>
                        Sign Up
                    </Button>
                    <Button variant="secondary">
                        Login
                    </Button>
                </nav>
            </div>
        </header>
    )
}