import type { MemberRole } from "@/@types/member";
import { api } from "@/config/api.config";

type Response = {
    members: {
        id: string;
        role: MemberRole;
        userId: string;
        organizationId: string;
        createdAt: string;
        updatedAt: string;
        user: {
            name: string;
            email: string;
        }
    }[]
}

export async function getOrganizationMembers(orgSlug: string) {
    const result = await api.get(
        `members/organization/${orgSlug}`
    ).json<Response>();
    return result;
}