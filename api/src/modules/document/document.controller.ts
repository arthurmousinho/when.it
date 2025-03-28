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

    @Post('organization/:organizationSlug/upload')
    @FormDataRequest()
    public async upload(
        @Body() data: UploadDocumentDTO,
        @Param('organizationSlug') organizationSlug: string
    ) {
        const document = await this.documentService.upload({
            ...data,
            organizationSlug,
        });
        return { document };
    }

    @Get('organization/:organizationSlug')
    public async getOrganizationDocuments(
        @Param('organizationSlug') organizationSlug: string
    ) {
        const documents = await this.documentService.getByOrganization(organizationSlug);
        return { documents };
    }

}