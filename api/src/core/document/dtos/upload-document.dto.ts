import { IsNotEmpty, IsString, IsUUID, MaxLength, MinLength } from "class-validator";
import { HasMimeType, IsFile, MaxFileSize } from "nestjs-form-data";

export class UploadDocumentDTO {

    @IsNotEmpty({ message: 'Nome do documento é obrigatório' })
    @IsString({ message: 'Nome do documento deve ser uma string' })
    @MinLength(3, { message: 'Nome do documento deve ter no mínimo 3 caracteres' })
    @MaxLength(20, { message: 'Nome do documento deve ter no máximo 50 caracteres' })
    name: string;

    @IsNotEmpty({ message: 'Descrição do documento é obrigatória' })
    @IsString({ message: 'Descrição do documento deve ser uma string' })
    @MinLength(3, { message: 'Descrição do documento deve ter no mínimo 3 caracteres' })
    @MaxLength(100, { message: 'Descrição do documento deve ter no máximo 100 caracteres' })
    description: string;

    @IsNotEmpty({ message: 'Arquivo do documento é obrigatório' })
    @IsFile({ message: 'Arquivo do documento deve ser um arquivo' })
    @MaxFileSize(10000000, { message: 'Arquivo do documento deve ter no máximo 10MB' })
    @HasMimeType(['application/pdf'], { message: 'Arquivo do documento deve ser um PDF' })
    file: Express.Multer.File;

}