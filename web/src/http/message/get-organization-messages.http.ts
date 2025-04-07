import type { MessageAuthor } from "@/@types/message";
import { api } from "@/config/api.config";

type Response = {
    messages: {
        id: string;
        content: string;
        authorType: MessageAuthor,
        chatId: string;
        createdAt: string;
        chat: {
            member: {
                user: {
                    name: string;
                    email: string;
                }
            }
        }
    }[]
}

export async function getOrganizationMessages(orgSlug: string) {
    const result = await api.get(
        `messages/organization/${orgSlug}`
    ).json<Response>();
    return result;
}