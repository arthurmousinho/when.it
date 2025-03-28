import Image from "next/image";
import logo from "@/assets/brand/horizontal-logo.svg";
import { ProfileButton } from "@/app/auth/(auth)/profile-button";

export function WelcomeHeader() {
    return (
        <header className="border-b p-4 px-10">
            <div className="flex items-center justify-between">
                <Image src={logo} alt="when.it" width={150} height={50} />
                <ProfileButton />
            </div>
        </header>
    )
}