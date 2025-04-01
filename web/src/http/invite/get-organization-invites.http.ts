import type { InviteStatus } from "@/@types/invite";
import type { MemberRole } from "@/@types/member";
import { api } from "@/config/api.config";

type Response = {
    invites: {
        id: string;
        email: string;
        role: MemberRole;
        authorId: string;
        status: InviteStatus;
        organizationId: string;
        sentAt: string;
    }[]
}

export async function getOrganizationInvites(orgSlug: string) {
    const result = await api.get(
        `invites/organization/${orgSlug}`
    ).json<Response>();
    return result;
}