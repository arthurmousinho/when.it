import { ConflictException, Injectable, UnauthorizedException } from "@nestjs/common";
import { PrismaService } from "src/database/prisma.service";
import { compare, hash } from "bcrypt";
import { JwtService } from '@nestjs/jwt';
import type { LoginUserDTO } from "./dtos/login-user.dto";
import type { SignUpUserDTO } from "./dtos/signup-user.dto";

@Injectable()
export class AuthService {

    constructor(
        private readonly prismaService: PrismaService,
        private readonly jwtService: JwtService,
    ) { }

    public async login(data: LoginUserDTO) {
        const { email, password } = data;

        const user = await this.prismaService.user.findUnique({
            where: {
                email,
            }
        });

        if (!user) {
            throw new UnauthorizedException('Credenciais inválidas');
        }

        const passwordMatch = await compare(password, user.password);

        if (!passwordMatch) {
            throw new UnauthorizedException('Credenciais inválidas');
        }

        const token = await this.jwtService.signAsync(
            {
                sub: user.id,
                name: user.name,
                email: user.email,
            },
            {
                secret: process.env.JWT_SECRET,
                expiresIn: '1d',
            }
        )

        return { token };
    }

    public async signUp(data: SignUpUserDTO) {

        const { name, email, password } = data;

        const userExists = await this.prismaService.user.findUnique({
            where: { email }
        });

        if (userExists) {
            throw new ConflictException('Email já está em uso');
        }

        const hashedPassword = await hash(password, 6);

        const user = await this.prismaService.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
            select: {
                id: true,
                name: true,
                email: true,
                createdAt: true,
            }
        });

        return { user }
    }

}