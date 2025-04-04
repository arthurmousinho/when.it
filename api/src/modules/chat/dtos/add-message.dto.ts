import type { MessageAuthorType } from "@prisma/client";

export class AddMessageDTO {

    content: string;

    chatId: string;

    organizationSlug: string;

    userId: string;

    authorType: MessageAuthorType;

}