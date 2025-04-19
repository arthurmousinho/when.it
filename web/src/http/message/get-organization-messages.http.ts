import type { MessageAuthor } from "@/@types/message";
import type { PaginatedResponse } from "@/@types/pagination";
import { api } from "@/config/api.config";

type Response = {
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
}

type Request = {
    organizationSlug: string;
    page: number;
    limit: number;
}

export async function getOrganizationMessages(request: Request) {
    const { organizationSlug, page, limit } = request;

    const result = await api.get(
        `messages/organization/${organizationSlug}?page=${page}&limit=${limit}`
    ).json<PaginatedResponse<Response>>();

    return result;
}