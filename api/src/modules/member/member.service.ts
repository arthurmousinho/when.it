import { Injectable, NotFoundException } from "@nestjs/common";
import { OrganizationService } from "../organization/organization.service";
import { PrismaService } from "src/database/prisma.service";

@Injectable()
export class MemberService {

    constructor(
        private readonly prismaService: PrismaService,
        private readonly organizationService: OrganizationService
    ) { }

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

}