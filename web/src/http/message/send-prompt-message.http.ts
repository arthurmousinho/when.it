import type { MessageAuthor } from "@/@types/message";
import { api } from "@/config/api.config";

type Response = {
    questionMessage: {
        id: string;
        content: string;
        authorType: MessageAuthor;
        chatId: string;
        createdAt: Date;
    },
    responseMessage: {
        id: string;
        content: string;
        authorType: MessageAuthor;
        chatId: string;
        createdAt: Date;
    }
}

type Payload = {
    organizationSlug: string;
    chatId: string;
    content: string;
}

export async function sendPromptMessage(payload: Payload) {
    const { organizationSlug, chatId, content } = payload;

    const result = await api.post(
        `messages/organization/${organizationSlug}/prompt`,
        {
            json: {
                chatId,
                content
            }
        }
    ).json<Response>();

    return result;
}