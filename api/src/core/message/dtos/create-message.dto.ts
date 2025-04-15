import type { MessageAuthorType } from "@prisma/client";

export class CreateMessageDTO {

    content: string;

    chatId: string;

    organizationId: string;

    authorType: MessageAuthorType;

}