'use server'

import type { FormActionResponse } from "@/@types/form-action-response";
import { createChat } from "@/http/chat/create-chat.http";
import { sendPromptMessage } from "@/http/message/send-prompt-message.http";
import { HTTPError } from "ky";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export async function createChatAction(organizationSlug: string) {
    const { chat } = await createChat(organizationSlug);
    revalidateTag('chats')
    redirect(`/chatbot/${organizationSlug}/${chat.id}`)
}

export type CreateChatWithPromptParams = {
    organizationSlug: string;
    prompt: string;
}

export async function createChatWithPromptAction(
    params: CreateChatWithPromptParams
): Promise<FormActionResponse> {
    try {
        const { organizationSlug, prompt } = params;

        const { chat } = await createChat(organizationSlug);

        await sendPromptMessage({
            organizationSlug,
            chatId: chat.id,
            content: prompt
        });

        revalidateTag('chats');

        return {
            message: chat.id,
            success: true,
        };

    } catch (error) {
        if (error instanceof HTTPError) {
            const { message } = await error.response.json();
            return { message, success: false };
        }

        console.error(error);

        return {
            message: 'Erro inesperado, tente novamente mais tarde',
            success: false,
        };
    }
}