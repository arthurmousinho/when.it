import { BadRequestException, CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { MemberRole } from '@prisma/client';
import { PrismaService } from 'src/infra/database/prisma.service';

import { SetMetadata } from '@nestjs/common';

export const OrganizationRoles = (...roles: MemberRole[]) => SetMetadata('roles', roles);

@Injectable()
export class OrganizationRoleGuard implements CanActivate {

    constructor(
        private reflector: Reflector,
        private prismaService: PrismaService,
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const requiredRoles = this.reflector.get<MemberRole[]>(
            'roles',
            context.getHandler(),
        );

        if (!requiredRoles || requiredRoles.length === 0) {
            return true;
        }

        const request = context.switchToHttp().getRequest();

        const userId = request.user?.sub;

        if (!userId) {
            throw new BadRequestException('Token inválido')
        }

        const organizationSlug = request.params.organizationSlug ?? request.params.slug;

        if (!organizationSlug) {
            throw new BadRequestException('Slug inválido da organização')
        }

        const member = await this.prismaService.member.findFirst({
            where: {
                userId,
                organization: {
                    slug: organizationSlug
                },
                role: { in: requiredRoles },
            },
        });

        if (!member) {
            throw new UnauthorizedException('Crendeciais inválidas')
        }

        return true;
    }
}