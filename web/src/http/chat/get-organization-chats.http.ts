import { api } from "@/config/api.config";

type Response = {
    chats: {
        id: string;
        organizationId: string;
        memberId: string;
        createdAt: string;
        member: {
            user: {
                name: string;
                email: string;
            }
        },
        messagesCount: number;
    }[]
}

export async function getOrganizationChats(orgSlug: string) {
    const result = await api.get(
        `chats/organization/${orgSlug}`
    ).json<Response>();
    return result;
}