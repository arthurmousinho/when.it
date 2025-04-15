import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/infra/database/prisma.service";
import type { CreateUserDTO } from "./dtos/create-user.dto";

@Injectable()
export class UserService {

    constructor(
        private readonly prismaService: PrismaService
    ) { }

    public async getById(id: string) {
        const user = await this.prismaService.user.findUnique({
            where: {
                id,
            },
            select: {
                id: true,
                name: true,
                email: true,
            }
        });

        if (!user) {
            return null;
        }

        return user
    }

    public async getByEmail(email: string) {
        const user = await this.prismaService.user.findUnique({
            where: {
                email,
            },
            select: {
                id: true,
                name: true,
                email: true,
                password: true
            }
        });

        if (!user) {
            return null;
        }

        return user
    }

    public async create(data: CreateUserDTO) {
        const { name, email, password } = data;

        const user = await this.prismaService.user.create({
            data: {
                name,
                email,
                password,
            },
            select: {
                id: true,
                name: true,
                email: true,
            }
        });

        return user;
    }

}