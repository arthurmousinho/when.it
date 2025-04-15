import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class SignUpUserDTO {

    @IsNotEmpty({ message: 'Nome é obrigatório' })
    @IsString({ message: 'Nome deve ser uma string' })
    @MinLength(3, { message: 'Nome deve conter no mínimo 3 caracteres' })
    @MaxLength(255, { message: 'Nome deve conter no máximo 255 caracteres' })
    name: string;

    @IsNotEmpty({ message: 'Email é obrigatório' })
    @IsString({ message: 'Email deve ser uma string' })
    @IsEmail(undefined, { message: 'Email inválido' })
    @MaxLength(255, { message: 'Email deve conter no máximo 255 caracteres' })
    email: string;

    @IsNotEmpty({ message: 'Senha é obrigatória' })
    @IsString({ message: 'Senha deve ser uma string' })
    @MinLength(6, { message: 'Senha deve conter no mínimo 6 caracteres' })
    @MaxLength(255, { message: 'Senha deve conter no máximo 255 caracteres' })
    password: string;

}