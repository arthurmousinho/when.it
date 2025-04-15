import { MemberRole } from "@prisma/client";
import { IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator";

export class CreateInviteDTO {

    @IsNotEmpty({ message: 'Email é obrigatório' })
    @IsString({ message: 'Email deve ser uma string' })
    @IsEmail({}, { message: 'Email inválido' })
    email: string;

    @IsNotEmpty({ message: 'Cargo é obrigatório' })
    @IsString({ message: 'Cargo deve ser uma string' })
    @IsEnum(MemberRole, { message: 'Cargo inválido' })
    role: string;

    organizationSlug: string;
    
    userId: string;

}