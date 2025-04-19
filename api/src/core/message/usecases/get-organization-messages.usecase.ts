import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/infra/database/prisma.service";
import { OrganizationService } from "src/core/organization/organization.service";
import type { PaginatedResponse, PaginationRequest } from "src/@types/pagination.type";
import type { MessageAuthorType } from "@prisma/client";

type GetOrganizationMessagesRequest = {
    organizationSlug: string;
    pagination: PaginationRequest;
};

type PaginatedOrganizationMessagesResponse = PaginatedResponse<{
    id: string;
    createdAt: Date;
    content: string;
    authorType: MessageAuthorType;
    chatId: string;
    chat: {
        member: {
            user: {
                name: string;
                email: string;
            };
        };
    };
}>;

@Injectable()
export class GetOrganizationMessagesUseCase {

    constructor(
        private readonly prismaService: PrismaService,
        private readonly organizationService: OrganizationService
    ) { }

    public async execute(params: GetOrganizationMessagesRequest): Promise<PaginatedOrganizationMessagesResponse> {
        const { organizationSlug, pagination: { page, limit } } = params;

        const organization = await this.organizationService.getBySlug(organizationSlug);

        if (!organization) {
            throw new NotFoundException('Organização não encontrada');
        }

        const skip = (page - 1) * limit;

        const [total, messages] = await Promise.all([
            this.prismaService.message.count({
                where: {
                    chat: {
                        organization: {
                            slug: organizationSlug,
                        },
                    },
                },
            }),
            this.prismaService.message.findMany({
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
                },
                skip,
                take: limit,
            }),
        ]);

        const lastPage = Math.ceil(total / limit);

        return {
            data: messages,
            meta: {
                total,
                page,
                limit,
                lastPage,
                hasNextPage: page < lastPage,
                hasPreviousPage: page > 1,
            },
        };
    }

}