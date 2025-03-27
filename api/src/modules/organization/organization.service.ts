import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/database/prisma.service";
import { UserService } from "../user/user.service";
import type { CreateOrganizationDTO } from "./dtos/create-organization.dto";

@Injectable()
export class OrganizationService {

    constructor(
        private prismaService: PrismaService,
        private userService: UserService,
    ) { }

    public async create(data: CreateOrganizationDTO & { managerId: string }) {
        const { name, managerId } = data;

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

}