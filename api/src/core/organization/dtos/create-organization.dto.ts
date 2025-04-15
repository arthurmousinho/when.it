import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class CreateOrganizationDTO {

    @IsNotEmpty({ message: 'Nome da organização é obrigatório' })
    @IsString({ message: 'Nome da organização deve ser uma string' })
    @MinLength(3, { message: 'Nome da organização deve ter no mínimo 3 caracteres' })
    @MaxLength(50, { message: 'Nome da organização deve ter no máximo 50 caracteres' })
    name: string;

    @IsNotEmpty({ message: 'Descrição da organização é obrigatório' })
    @IsString({ message: 'Descrição da organização deve ser uma string' })
    @MinLength(3, { message: 'Descrição da organização deve ter no mínimo 3 caracteres' })
    @MaxLength(200, { message: 'Descrição da organização deve ter no máximo 200 caracteres' })
    description: string;

}