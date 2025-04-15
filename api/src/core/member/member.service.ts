import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { OrganizationService } from "../organization/organization.service";
import { PrismaService } from "src/infra/database/prisma.service";
import type { CreateMemberDTO } from "./dtos/create-member.dto";

@Injectable()
export class MemberService {

    constructor(
        private readonly prismaService: PrismaService,
        private readonly organizationService: OrganizationService
    ) { }

    public async create(data: CreateMemberDTO) {
        const { role, userId, organizationId } = data;

        const memberAlreadyExists = await this.prismaService.member.findFirst({
            where: {
                userId: data.userId,
                organizationId: organizationId
            }
        });

        if (memberAlreadyExists) {
            throw new ConflictException('Usuário já é membro desta organização');
        }

        const member = await this.prismaService.member.create({
            data: {
                role,
                userId,
                organizationId
            }
        });

        return member;
    }

    public async getOrganizationMembers(organizationSlug: string) {
        const org = await this.organizationService.getBySlug(organizationSlug);

        if (!org) {
            throw new NotFoundException('Organização não encontrada');
        }

        const members = await this.prismaService.member.findMany({
            where: {
                organizationId: org.id,
            },
            include: {
                user: {
                    select: {
                        name: true,
                        email: true
                    }
                },
            },
        });

        return members;
    }

    public async getMembership(params: {
        userId: string;
        organizationSlug: string;
    }) {
        const { userId, organizationSlug } = params;

        return await this.prismaService.member.findFirst({
            where: {
                userId,
                organization: {
                    slug: organizationSlug
                }
            },
            include: {
                user: {
                    select: {
                        email: true
                    }
                },
                organization: {
                    select: {
                        name: true
                    }
                }
            }
        });
    }

}