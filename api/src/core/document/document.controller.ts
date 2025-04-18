import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    UseGuards,
} from '@nestjs/common';
import { DocumentService } from './document.service';
import { UploadDocumentDTO } from './dtos/upload-document.dto';
import { FormDataRequest } from 'nestjs-form-data';
import { AuthGuard } from '../auth/guards/auth.guard';
import { OrganizationRoleGuard, OrganizationRoles } from '../auth/guards/organization-role.guard';

@UseGuards(AuthGuard, OrganizationRoleGuard)
@Controller('documents')
export class DocumentController {

    constructor(
        private readonly documentService: DocumentService
    ) { }

    @Post('organization/:slug/upload')
    @OrganizationRoles('MANAGER')
    @FormDataRequest()
    public async upload(
        @Body() data: UploadDocumentDTO,
        @Param('slug') organizationSlug: string
    ) {
        const document = await this.documentService.upload({
            ...data,
            organizationSlug,
        });
        return { document };
    }

    @Post('organization/:slug/:documentId/embed')
    @OrganizationRoles('MANAGER')
    public async embbed(
        @Param('documentId') documentId: string
    ) {
        const document = await this.documentService.embedDocument(documentId);
        return { document };
    }

    @Get('organization/:slug')
    @OrganizationRoles('MANAGER')
    public async getOrganizationDocuments(
        @Param('slug') organizationSlug: string
    ) {
        const documents = await this.documentService.getByOrganization(organizationSlug);
        return { documents };
    }

    @Get('organization/:slug/:documentId')
    @OrganizationRoles('MANAGER')
    public async getDetails(
        @Param('documentId') documentId: string
    ) {
        const document = await this.documentService.getById(documentId);
        return { document };
    }

    @Delete('organization/:slug/:documentId')
    @OrganizationRoles('MANAGER')
    public async delete(
        @Param('documentId') documentId: string
    ) {
        await this.documentService.deleteDocument(documentId);
    }

}