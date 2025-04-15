import Link from "next/link"
import Image from "next/image"

import { getUserOrganizations } from "@/http/organization/get-user-organizations.http"
import logo from "@/assets/brand/horizontal-logo.svg"
import { ProfileButton } from "@/app/auth/(auth)/profile-button"
import { OrganizationSelect } from "@/app/orgs/(orgs)/organization-select"
import { Slash } from "lucide-react"

type Props = {
    currentOrganizationSlug: string
}

export async function ManagerHeader({ currentOrganizationSlug }: Props) {
    
    const { organizations } = await getUserOrganizations()

    return (
        <header className="border-b p-4 bg-white w-full shrink-0 shadow-sm">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Link href="/orgs" className="cursor-pointer">
                        <Image src={logo || "/placeholder.svg"} alt="when.it" width={150} height={50} />
                    </Link>
                    <Slash className="size-4 -rotate-[24deg] text-border" />
                    <OrganizationSelect
                        currentOrganizationSlug={currentOrganizationSlug}
                        organizations={organizations}
                    />
                </div>
                <ProfileButton />
            </div>
        </header>
    )
}