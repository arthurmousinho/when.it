import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { compare, hash } from "bcrypt";
import { JwtService } from '@nestjs/jwt';
import { UserService } from "../user/user.service";
import type { LoginUserDTO } from "./dtos/login-user.dto";
import type { SignUpUserDTO } from "./dtos/signup-user.dto";

@Injectable()
export class AuthService {

    constructor(
        private readonly jwtService: JwtService,
        private readonly userService: UserService
    ) { }

    public async login(data: LoginUserDTO) {
        const { email, password } = data;

        const user = await this.userService.getByEmail(email);

        if (!user) {
            throw new UnauthorizedException('Credenciais inválidas');
        }

        const passwordMatch = await compare(password, user.password);

        if (!passwordMatch) {
            throw new UnauthorizedException('Credenciais inválidas');
        }

        const token = await this.jwtService.signAsync({
            sub: user.id,
            name: user.name,
            email: user.email,
        })

        return { token };
    }

    public async signUp(data: SignUpUserDTO) {

        const { name, email, password } = data;

        const userExists = await this.userService.getByEmail(email);

        if (userExists) {
            throw new ConflictException('Email já está em uso');
        }

        const hashedPassword = await hash(password, 6);

        const user = await this.userService.create({
            name,
            email,
            password: hashedPassword,
        });

        return { user }
    }

    public async getProfile(data: { userId: string }) {
        const { userId } = data;

        const user = await this.userService.getById(userId);

        if (!user) {
            throw new NotFoundException('Usuário não encontrado');
        }

        return {
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        }
        
    }

}