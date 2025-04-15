import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { PrismaService } from "src/infra/database/prisma.service";
import { ChatService } from "../chat/chat.service";
import { OrganizationService } from "../organization/organization.service";
import { AIModelService } from "src/infra/ai/ai-model.service";
import { VectorStoreService } from "src/infra/ai/vector-store.service";

import type { SendPromptMessageDTO } from "./dtos/send-message.dto";
import type { CreateMessageDTO } from "./dtos/create-message.dto";

@Injectable()
export class MessageService {

    constructor(
        private readonly prismaService: PrismaService,
        private readonly chatService: ChatService,
        private readonly organizationService: OrganizationService,
        private readonly aiModelService: AIModelService,
        private readonly vectorStoreService: VectorStoreService
    ) { }

    public async createMessage(data: CreateMessageDTO) {
        const { chatId, content, organizationId, authorType } = data;

        const chat = await this.chatService.getById(chatId);

        if (!chat) {
            throw new NotFoundException('Chat não encontrado');
        }

        const chatBelongsToOrg = chat.organizationId === organizationId;

        if (!chatBelongsToOrg) {
            throw new UnauthorizedException('Você não pode enviar mensagens nesse chat');
        }

        return await this.prismaService.message.create({
            data: {
                chatId,
                content,
                authorType
            }
        })
    }

    public async sendPromptMessage(data: SendPromptMessageDTO) {
        const { chatId, content, organizationSlug } = data;

        const org = await this.organizationService.getBySlug(organizationSlug);

        if (!org) {
            throw new NotFoundException('Organização não encontrada');
        }

        const questionMessage = await this.createMessage({
            chatId,
            content,
            organizationId: org.id,
            authorType: "MEMBER"
        });

        const questionEmbedding = await this.aiModelService.generateEmbedding(content);

        const vectorMatches = await this.vectorStoreService.query({
            vector: questionEmbedding.embedding,
            organizationId: org.id,
        });

        const vectorMatchesChunks = vectorMatches.map(v => v.metadata?.chunks) as string[];

        const promptResponse = await this.aiModelService.sendPrompt({
            question: content,
            organizationName: org?.name,
            organizationDescription: org?.description,
            chunks: vectorMatchesChunks,
        });

        const responseMessage = await this.createMessage({
            chatId,
            content: promptResponse || '',
            organizationId: org.id,
            authorType: "AI"
        });

        return {
            questionMessage,
            responseMessage
        }

    }

    public async getOrganizationMessages(organizationSlug: string) {
        return await this.prismaService.message.findMany({
            where: {
                chat: {
                    organization: {
                        slug: organizationSlug,
                    },
                },
            },
            include: {
                chat: {
                    select: {
                        member: {
                            select: {
                                user: {
                                    select: {
                                        name: true,
                                        email: true,
                                    },
                                },
                            },
                        },
                    },
                },
            },
            orderBy: {
                createdAt: 'asc',
            }
        });
    }

    public async getChatMessages(chatId: string) {
        return await this.prismaService.message.findMany({
            where: {
                chatId
            }
        })
    }

}