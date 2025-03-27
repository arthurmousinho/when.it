import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    UseGuards,
} from '@nestjs/common';
import { DocumentService } from './document.service';
import { UploadDocumentDTO } from './dtos/upload-document.dto';
import { FormDataRequest } from 'nestjs-form-data';
import { AuthGuard } from '../auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('documents')
export class DocumentController {

    constructor(
        private readonly documentService: DocumentService
    ) { }

    @Post('upload')
    @FormDataRequest()
    public async upload(@Body() data: UploadDocumentDTO) {
        const document = await this.documentService.upload(data);
        return { document };
    }

    @Get(':organizationId')
    public async getAllByOrganizationId(@Param('organizationId') organizationId: string) {
        const documents = await this.documentService.getAllByOrganizationId(organizationId);
        return { documents };
    }

}