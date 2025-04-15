import { IsNotEmpty, IsString, IsUUID, MaxLength, MinLength } from "class-validator";

export class SendPromptMessageDTO {

    @IsNotEmpty({ message: 'Conteúdo do prompt não pode ser vazio.' })
    @IsString({ message: 'Conteúdo do prompt deve ser uma string.' })
    @MinLength(2, { message: 'Conteúdo do prompt deve ter pelo menos 2 caracteres.' })
    @MaxLength(255, { message: 'Conteúdo do prompt deve ter no máximo 255 caracteres.' })
    content: string;

    @IsNotEmpty({ message: 'ID do chat não pode ser vazio.' })
    @IsString({ message: 'ID do chat deve ser uma string.' })
    @IsUUID('4', { message: 'ID do chat deve ser um UUID válido.' })
    chatId: string;

    organizationSlug: string;

    userId: string;

}