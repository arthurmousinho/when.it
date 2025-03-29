import Image from "next/image";
import logo from "@/assets/brand/horizontal-logo.svg";
import { ProfileButton } from "@/app/auth/(auth)/profile-button";
import Link from "next/link";

export function BaseHeader() {
    return (
        <header className="border-b p-4 px-10">
            <div className="flex items-center justify-between">
                <Link href="/orgs" className="cursor pointer">
                    <Image src={logo} alt="when.it" width={150} height={50} />
                </Link>
                <ProfileButton />
            </div>
        </header>
    )
}