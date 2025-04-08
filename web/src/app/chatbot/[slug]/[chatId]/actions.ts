'use server'

import { HTTPError } from 'ky';
import { sendPromptMessage } from '@/http/message/send-prompt-message.http';
import { revalidateTag } from 'next/cache';

export type SendPromptMessageActionParams = {
    organizationSlug: string;
    chatId: string;
    content: string;
}

export async function sendPromptMessageAction(data: SendPromptMessageActionParams) {
    try {
        const { questionMessage, responseMessage } = await sendPromptMessage(data);

        revalidateTag('messages')

        return {
            message: responseMessage.content,
            success: true,
        }

    } catch (error) {
        if (error instanceof HTTPError) {
            const { message } = await error.response.json();
            return { message, success: false }
        }

        console.error(error);

        return {
            message: 'Erro inesperado, tente novamente mais tarde',
            success: false,
        }
    }

}