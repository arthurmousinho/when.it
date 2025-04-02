import { api } from "@/config/api.config";

export async function acceptInvite(inviteId: string) {
    await api.post(
        `invites/${inviteId}/accept`,
    ).json<Response>();
}