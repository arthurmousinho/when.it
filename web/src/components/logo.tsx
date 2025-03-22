import Link from "next/link";
import Image from "next/image";

import horizontalLogo from "@/assets/brand/horizontal-logo.svg";

type LogoProps = {
    href?: string;
    width?: number;
    height?: number;
}

export function Logo({
    href = '/',
    width = 170,
    height = 32
}: LogoProps) {
    return (
        <Link href={href}>
            <Image 
                src={horizontalLogo}
                alt="when.it"
                width={width}
                height={height}
            />
        </Link>
    )
}