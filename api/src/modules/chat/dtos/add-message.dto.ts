import type { MessageAuthorType } from "@prisma/client";

export class AddMessageDTO {

    content: string;

    chatId: string;

    organizationId: string;

    authorType: MessageAuthorType;

}