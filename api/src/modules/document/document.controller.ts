import {
    Body,
    Controller,
    Post,
} from '@nestjs/common';
import { DocumentService } from './document.service';
import { UploadDocumentDTO } from './dtos/upload-document.dto';
import { FormDataRequest } from 'nestjs-form-data';

@Controller('documents')
export class DocumentController {

    constructor(
        private readonly documentService: DocumentService
    ) { }

    @Post('upload')
    @FormDataRequest()
    public async upload(@Body() data: UploadDocumentDTO) {
        return await this.documentService.upload(data);
    }

}