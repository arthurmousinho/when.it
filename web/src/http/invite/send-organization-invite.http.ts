import type { MemberRole } from "@/@types/member";
import { api } from "@/config/api.config";

type Payload = {
    email: string;
    role: MemberRole;
}

type Response = {
    id: string;
    email: string;
    role: string;
    authorId: string;
    organizationId: string;
    sentAt: string;
}

export async function sendOrganizationInvite(organizationSlug: string, payload: Payload) {
    const result = await api.post(
        `invites/organization/${organizationSlug}`,
        { json: payload }
    ).json<Response>();

    return result;
}