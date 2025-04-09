import { api } from "@/config/api.config";

type Response = {
    chat: {
        id: string;
        organizationId: string;
        memberId: string;
        createdAt: string;
    }
}

export async function createChat(orgSlug: string): Promise<Response> {
    const result = await api.post(
        `chats/organization/${orgSlug}`,
    ).json<Response>();

    return result;
}