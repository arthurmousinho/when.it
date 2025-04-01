import type { MemberRole } from "@/@types/member";
import { api } from "@/config/api.config";

type Response = {
    invite: {
        id: string;
        email: string;
        role: MemberRole;
        authorId: string;
        organizationId: string;
        sentAt: string;
        organization: {
            name: string;
        },
        author: {
            name: string;
        }
    }
}

export async function getInvite(inviteId: string) {
    const result = await api.get(
        `invites/${inviteId}`
    ).json<Response>();
    return result;
}