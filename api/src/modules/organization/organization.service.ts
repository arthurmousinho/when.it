import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/database/prisma.service";
import { UserService } from "../user/user.service";
import { subDays, startOfDay } from 'date-fns';
import type { CreateOrganizationDTO } from "./dtos/create-organization.dto";

@Injectable()
export class OrganizationService {

    constructor(
        private prismaService: PrismaService,
        private userService: UserService,
    ) { }

    public async create(data: CreateOrganizationDTO & { managerId: string }) {
        const { name, managerId, description } = data;

        const manager = await this.userService.getById(managerId);

        if (!manager) {
            throw new NotFoundException('Usuário não encontrado');
        }

        const slug = name.toLowerCase().replace(/ /g, '-');

        const organizationAlreadyExistsWithSlug = await this.prismaService.organization.findUnique({
            where: {
                slug,
            },
        });

        if (organizationAlreadyExistsWithSlug) {
            throw new ConflictException('Já existe uma organização com esse nome, tente outro nome');
        }

        const organization = await this.prismaService.organization.create({
            data: {
                name,
                slug,
                description,
                members: {
                    create: {
                        userId: manager.id,
                        role: 'MANAGER',
                    },
                }
            },
        });

        return { organization };
    }

    public async getAllByUserId(userId: string) {
        const organizations = await this.prismaService.organization.findMany({
            where: {
                members: {
                    some: {
                        userId,
                    },
                },
            },
            include: {
                _count: {
                    select: {
                        chats: true
                    },
                },
                members: {
                    where: {
                        userId,
                    }
                }
            }
        });

        return organizations.map(org => ({
            id: org.id,
            name: org.name,
            description: org.description,
            slug: org.slug,
            chatsCount: org._count.chats,
            role: org.members[0].role,
        }));
    }

    public async getBySlug(slug: string) {
        const organization = await this.prismaService.organization.findUnique({
            where: {
                slug
            }
        })

        if (!organization) {
            return null;
        }

        return organization;
    }

    public async getDashboard(slug: string) {
        const org = await this.prismaService.organization.findUnique({
            where: { slug },
            select: {
                id: true,
                name: true,
                slug: true,
            },
        });

        if (!org) {
            throw new NotFoundException('Organização não encontrada');
        }

        const sevenDaysAgo = startOfDay(subDays(new Date(), 6));

        const [counts, messageBreakdown, weeklyUsageRaw] = await Promise.all([
            this.prismaService.organization.findUnique({
                where: { id: org.id },
                select: {
                    _count: {
                        select: {
                            members: true,
                            documents: true,
                            chats: true,
                        },
                    },
                },
            }),

            this.prismaService.message.groupBy({
                by: ['authorType'],
                _count: true,
                where: {
                    chat: {
                        organizationId: org.id,
                    },
                },
            }),

            this.prismaService.message.groupBy({
                by: ['createdAt'],
                _count: true,
                where: {
                    chat: {
                        organizationId: org.id,
                    },
                    createdAt: {
                        gte: sevenDaysAgo,
                    },
                },
                orderBy: {
                    createdAt: 'asc',
                },
            }),
        ]);

        const fromMemberCount = messageBreakdown.find(m => m.authorType === 'MEMBER')?._count || 0;
        const fromAICount = messageBreakdown.find(m => m.authorType === 'AI')?._count || 0;

        const totalMessages = fromMemberCount + fromAICount;

        const usageMap = new Map<string, number>();
        for (let i = 0; i < 7; i++) {
            const date = startOfDay(subDays(new Date(), 6 - i)).toISOString().split('T')[0];
            usageMap.set(date, 0);
        }

        weeklyUsageRaw.forEach((entry) => {
            const date = startOfDay(entry.createdAt).toISOString().split('T')[0];
            usageMap.set(date, entry._count);
        });

        const weeklyUsage = Array.from(usageMap.entries()).map(([date, messagesCount]) => ({
            date,
            messagesCount,
        }));

        const [uploadedCount, embeddedCount] = await Promise.all([
            this.prismaService.document.count({
                where: {
                    organizationId: org.id,
                    status: 'UPLOADED',
                },
            }),
            this.prismaService.document.count({
                where: {
                    organizationId: org.id,
                    status: 'EMBEDDED',
                },
            }),
        ]);

        return {
            organization: {
                id: org.id,
                slug: org.slug,
                name: org.name,
            },
            documents: {
                totalCount: counts?._count.documents,
                uploadedCount,
                embeddedCount,
            },
            members: {
                totalCount: counts?._count.members,
            },
            messages: {
                total: totalMessages,
                fromMemberCount,
                fromAICount,
            },
            chats: {
                total: counts?._count.chats,
            },
            weeklyUsage,
        };
    }


}