import type { MemberRole } from "@/@types/member";
import { api } from "@/config/api.config";

type Response = {
    member: {
        id: string;
        role: MemberRole;
        userId: string;
        organizationId: string;
        createdAt: string;
        updatedAt: string;
        organization: {
            name: string;
        },
        user: {
            email: string;
        }
    }
}


export async function getUserMembership(orgSlug: string) {
    const result = await api.get(
        `members/organization/${orgSlug}/membership`
    ).json<Response>();
    return result;
}