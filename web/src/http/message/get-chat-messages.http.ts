import type { MessageAuthor } from "@/@types/message";
import { api } from "@/config/api.config";

type Response = {
    messages: {
        id: string;
        content: string;
        authorType: MessageAuthor,
        chatId: string;
        createdAt: string;
    }[]
}

export async function getChatMessages(chatId: string) {
    const result = await api.get(
        `messages/chat/${chatId}`
    ).json<Response>();
    return result;
}