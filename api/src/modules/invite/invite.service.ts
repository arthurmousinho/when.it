import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { EmailService } from "../email/email.service";
import { PrismaService } from "src/database/prisma.service";
import { OrganizationService } from "../organization/organization.service";
import type { CreateInviteDTO } from "./dtos/create-invite.dto";
import type { MemberRole } from "@prisma/client";

@Injectable()
export class InviteService {

    constructor(
        private readonly prismaService: PrismaService,
        private readonly emailService: EmailService,
        private readonly organizationService: OrganizationService
    ) { }

    public async create(data: CreateInviteDTO) {
        const { email, role, organizationSlug, userId } = data;

        const org = await this.organizationService.getBySlug(organizationSlug);

        if (!org) {
            throw new NotFoundException('Organização não encontrada');
        }

        const inviteAlreadySentToEmail = await this.prismaService.invite.findUnique({
            where: {
                email
            }
        });

        if (inviteAlreadySentToEmail) {
            throw new ConflictException('Já foi enviado um convite para este email');
        }

        const invite = await this.prismaService.invite.create({
            data: {
                email,
                role: role as MemberRole,
                organizationId: org.id,
                authorId: userId
            }
        });

        try {
            await this.emailService.sendEmail({
                to: email,
                subject: 'When.it - Convite para organização',
                text: `
                    Olá, você foi convidado para participar da organização ${org.name} \n
                    Link para aceitar o convite: ${process.env.FRONTEND_URL}/invite/${invite.id}
                `,
            });
        } catch (error) {
            console.log(error);
            await this.prismaService.invite.delete({
                where: {
                    id: invite.id
                }
            });
        }

        return invite;
    }

    public async getOrganizationInvites(organizationSlug: string) {
        const org = await this.organizationService.getBySlug(organizationSlug);

        if (!org) {
            throw new NotFoundException('Organização não encontrada');
        }

        const invites = await this.prismaService.invite.findMany({
            where: {
                organizationId: org.id
            },
            orderBy: {
                sentAt: 'desc'
            }
        });

        return invites;
    }

    public async getById(inviteId: string) {
        const invite = await this.prismaService.invite.findUnique({
            where: {
                id: inviteId
            },
            include: {
                author: {
                    select: {
                        name: true
                    }
                },
                organization: {
                    select: {
                        name: true
                    }
                }
            }
        })

        if (!invite) {
            throw new NotFoundException('Convite não encontrado');
        }

        return invite;
    }

}