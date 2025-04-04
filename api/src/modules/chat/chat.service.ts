import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { MemberService } from '../member/member.service';
import { OrganizationService } from '../organization/organization.service';
import { AIService } from '../ai/ai.service';

import type { CreateChatDTO } from './dtos/create-chat.dto';
import type { SendPromptDTO } from './dtos/send-prompt.dto';
import type { AddMessageDTO } from './dtos/add-message.dto';

import OpenAI from 'openai';

@Injectable()
export class ChatService {

    constructor(
        private readonly prismaService: PrismaService,
        private readonly memberService: MemberService,
        private readonly organizationService: OrganizationService,
        private readonly aiService: AIService
    ) {}

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

    public async addMessage(data: AddMessageDTO) {
        const { userId, chatId, content, organizationSlug, authorType } = data;

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

        const chat = await this.getById(chatId);

        if (!chat) {
            throw new NotFoundException('Chat não encontrado');
        }

        const chatBelongsToOrg = chat.organizationId === org.id;

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
        const { userId, chatId, content, organizationSlug } = data;

        await this.addMessage({
            userId,
            chatId,
            content,
            organizationSlug,
            authorType: "MEMBER"
        })

        const promptResponse = await this.aiService.sendPrompt(content);

        return await this.addMessage({
            userId,
            chatId,
            content: promptResponse || '',
            organizationSlug,
            authorType: "AI"
        })
    }

}