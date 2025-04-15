import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/infra/database/prisma.service';
import { MemberService } from '../member/member.service';
import { OrganizationService } from '../organization/organization.service';

import type { CreateChatDTO } from './dtos/create-chat.dto';
@Injectable()
export class ChatService {

    constructor(
        private readonly prismaService: PrismaService,
        private readonly memberService: MemberService,
        private readonly organizationService: OrganizationService,
    ) { }

    public async create(data: CreateChatDTO) {
        const { userId, organizationSlug } = data;

        const org = await this.organizationService.getBySlug(organizationSlug);

        if (!org) {
            throw new NotFoundException('Organização não encontrada');
        }

        const membership = await this.memberService.getMembership({
            userId,
            organizationSlug
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

    public async getMemberChats(data: {
        userId: string;
        organizationSlug: string;
    }) {
        const { userId, organizationSlug } = data;

        return await this.prismaService.chat.findMany({
            where: {
                member: {
                    userId,
                },
                organization: {
                    slug: organizationSlug
                }
            },
            include: {
                organization: {
                    select: {
                        name: true
                    }
                },
                member: {
                    select: {
                        user: {
                            select: {
                                email: true
                            }
                        }
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        })
    }

}