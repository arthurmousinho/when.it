import { ProfileButton } from "@/app/auth/(auth)/profile-button";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import Image from "next/image";

import logo from "@/assets/brand/horizontal-logo.svg";

export function ManagerHeader() {
    return (
        <header className="border-b p-4 bg-white w-full shrink-0">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/orgs" className="cursor pointer">
                        <Image src={logo} alt="when.it" width={150} height={50} />
                    </Link>
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage>Documentos</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
                <ProfileButton />
            </div>
        </header>
    )
}