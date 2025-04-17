"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ChevronsUpDown } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import type { MemberRole } from "@/@types/member"

type Props = {
    currentOrganizationSlug: string
    organizations: Array<{
        name: string
        slug: string
        role: MemberRole
    }>
}

export function OrganizationSelect({ currentOrganizationSlug, organizations }: Props) {
    const router = useRouter()
    const [selectedOrg, setSelectedOrg] = useState(() => {
        return organizations.find((org) => org.slug === currentOrganizationSlug) || organizations[0]
    })

    function handleOrganizationSelect(slug: string) {
        const organization = organizations.find((org) => org.slug === slug)
        if (organization) {
            setSelectedOrg(organization)
            const memberRole = organization.role
            router.push(memberRole === "MANAGER" ? `/manager/${slug}` : `/chatbot/${slug}`)
        }
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild className="border-none shadow-none outline-none text-slate-900">
                <Button variant="outline" className="w-[220px] justify-between font-medium">
                    <div className="flex items-center gap-2 truncate">
                        <Avatar className="h-5 w-5">
                            <AvatarImage
                                src={`https://avatar.vercel.sh/${selectedOrg.slug}`}
                                alt={selectedOrg.name}
                            />
                        </Avatar>
                        <span className="truncate">{selectedOrg.name}</span>
                    </div>
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[200px] max-h-[300px] overflow-y-auto">
                {organizations.map((org) => (
                    <DropdownMenuItem
                        key={org.slug}
                        className="py-2 cursor-pointer"
                        onClick={() => handleOrganizationSelect(org.slug)}
                    >
                        <div className="flex items-center gap-2 w-full">
                            <Avatar className="h-6 w-6">
                                <AvatarImage src={`https://avatar.vercel.sh/${org.slug}`} alt={org.name} />
                                <AvatarFallback className="text-xs font-medium">
                                    {org.name.substring(0, 2).toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                            <span className="font-medium truncate">{org.name}</span>
                        </div>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}