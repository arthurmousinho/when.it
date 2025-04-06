import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { MemberService } from '../member/member.service';
import { OrganizationService } from '../organization/organization.service';
import { AIService } from '../ai/ai.service';
import { VectorService } from '../document/infra/vector.service';
import { DocumentService } from '../document/document.service';

import type { CreateChatDTO } from './dtos/create-chat.dto';
import type { SendPromptDTO } from './dtos/send-prompt.dto';
import type { AddMessageDTO } from './dtos/add-message.dto';

@Injectable()
export class ChatService {

    constructor(
        private readonly prismaService: PrismaService,
        private readonly memberService: MemberService,
        private readonly organizationService: OrganizationService,
        private readonly aiService: AIService,
        private readonly vectorService: VectorService,
        private readonly documentService: DocumentService
    ) { }

    public async create(data: CreateChatDTO) {
        const { userId, organizationSlug } = data;

        const org = await this.organizationService.getBySlug(organizationSlug);

        if (!org) {
            throw new NotFoundException('Organização não encontrada');
        }

        const membership = await this.memberService.getMembership({
            userId,
            organizationId: org.id,
        })

        if (!membership) {
            throw new UnauthorizedException('Você não é membro dessa organização');
        }

        return await this.prismaService.chat.create({
            data: {
                organizationId: org.id,
                memberId: membership.id,
            }
        })
    }

    public async getById(id: string) {
        return await this.prismaService.chat.findUnique({
            where: { id }
        })
    }

    public async getOrganizaionChats(organizationSlug: string) {
        const chats = await this.prismaService.chat.findMany({
            where: {
                organization: {
                    slug: organizationSlug
                }
            },
            include: {
                member: {
                    select: {
                        user: {
                            select: {
                                name: true,
                                email: true
                            }
                        }
                    }
                },
                _count: {
                    select: {
                        messages: true
                    }
                }
            }
        })

        return chats.map(chat => {
            return {
                ...chat,
                _count: undefined,
                messagesCount: chat._count.messages
            }
        })
    }

    public async addMessage(data: AddMessageDTO) {
        const { chatId, content, organizationId, authorType } = data;

        const chat = await this.getById(chatId);

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

    public async sendPrompt(data: SendPromptDTO) {
        const { chatId, content, organizationSlug } = data;

        const org = await this.organizationService.getBySlug(organizationSlug);

        if (!org) {
            throw new NotFoundException('Organização não encontrada');
        }

        await this.addMessage({
            chatId,
            content,
            organizationId: org.id,
            authorType: "MEMBER"
        });

        const questionEmbedding = await this.aiService.generateEmbedding(content);

        const vectorMatches = await this.vectorService.query({
            vector: questionEmbedding.embedding,
            organizationId: org.id,
        });

        const vectorMatchesChunks = vectorMatches.map(v => v.metadata?.chunks) as string[];

        const promptResponse = await this.aiService.sendPrompt({
            question: content,
            organizationName: org?.name,
            organizationDescription: org?.description,
            chunks: vectorMatchesChunks,
        });

        return await this.addMessage({
            chatId,
            content: promptResponse || '',
            organizationId: org.id,
            authorType: "AI"
        });
    }
}