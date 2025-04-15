'use client'

import { useRouter } from 'next/navigation'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import type { MemberRole } from '@/@types/member'

type Props = {
    currentOrganizationSlug: string
    organizations: Array<{
        name: string
        slug: string,
        role: MemberRole
    }>
}

export function OrganizationSelect({ currentOrganizationSlug, organizations }: Props) {

    const router = useRouter();

    function handleValueChange(slug: string) {
        const memberRole = organizations.find(org => org.slug === slug)?.role;
        router.push(memberRole === 'MANAGER' ? `/manager/${slug}` : `/chatbot/${slug}`);
    }

    return (
        <Select defaultValue={currentOrganizationSlug} onValueChange={handleValueChange}>
            <SelectTrigger className="w-[200px] font-medium">
                <SelectValue placeholder="Selecione uma organização" />
            </SelectTrigger>
            <SelectContent className="max-h-[300px]">
                {organizations.map((org) => (
                    <SelectItem key={org.slug} value={org.slug} className="py-2 cursor-pointer">
                        <div className="flex items-center gap-2 w-full">
                            <Avatar className="h-6 w-6">
                                <AvatarImage src={`https://avatar.vercel.sh/${org.slug}`} alt={org.name} />
                                <AvatarFallback className="text-xs font-medium">
                                    {org.name.substring(0, 2).toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                            <span className="font-medium truncate">{org.name}</span>
                        </div>
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}
