import { ConflictException, Injectable, NotFoundException, UnauthorizedException, UnprocessableEntityException } from "@nestjs/common";
import { EmailService } from "../email/email.service";
import { PrismaService } from "src/database/prisma.service";
import { OrganizationService } from "../organization/organization.service";
import { MemberService } from "../member/member.service";
import { UserService } from "../user/user.service";
import type { CreateInviteDTO } from "./dtos/create-invite.dto";
import type { MemberRole } from "@prisma/client";

@Injectable()
export class InviteService {

    constructor(
        private readonly prismaService: PrismaService,
        private readonly emailService: EmailService,
        private readonly organizationService: OrganizationService,
        private readonly memberService: MemberService,
        private readonly userService: UserService
    ) { }

    public async create(data: CreateInviteDTO) {
        const { email, role, organizationSlug, userId } = data;

        const org = await this.organizationService.getBySlug(organizationSlug);

        if (!org) {
            throw new NotFoundException('Organização não encontrada');
        }

        const inviteAlreadySentToEmail = await this.prismaService.invite.findUnique({
            where: {
                email,
                organizationId: org.id
            }
        });

        if (inviteAlreadySentToEmail) {
            throw new ConflictException('Já foi enviado um convite para este email para essa organização');
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
            await this.prismaService.invite.delete({
                where: {
                    id: invite.id
                }
            });

            throw new UnprocessableEntityException('Erro ao enviar o email de convite');
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

    public async acceptInvite(data: { inviteId: string, userId: string }) {
        const { inviteId, userId } = data;

        const invite = await this.getById(inviteId);
        const user = await this.userService.getById(userId);

        if (invite.email !== user?.email) {
            throw new UnauthorizedException('Usuário não autorizado');
        }

        if (invite.status !== 'PENDING') {
            throw new ConflictException('Convite expirado');
        }

        await this.memberService.create({
            organizationId: invite.organizationId,
            userId,
            role: invite.role
        })

        await this.prismaService.invite.update({
            where: {
                id: inviteId
            },
            data: {
                status: 'ACCEPTED'
            }
        })
    }

}