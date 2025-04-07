import { api } from "@/config/api.config";

type Response = {
    chats: {
        id: string;
        organizationId: string;
        memberId: string;
        createdAt: string;
    }[]
}

export async function getMemberChats(orgSlug: string): Promise<Response> {
    const result = await api.get(
        `chats/organization/${orgSlug}/member`,
    ).json<Response>();

    return result;
}