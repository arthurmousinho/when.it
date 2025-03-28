import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/prisma.service";
import { CloudinaryService } from "./infra/claudinary.service";
import { randomUUID } from "node:crypto";
import type { UploadDocumentDTO } from "./dtos/upload-document.dto";

@Injectable()
export class DocumentService {

    constructor(
        private readonly prismaService: PrismaService,
        private readonly cloudinaryService: CloudinaryService
    ) { }

    public async upload(data: UploadDocumentDTO) {
        const { name, description, file, organizationId } = data;

        const fileId = randomUUID();
        const fileUrl = await this.cloudinaryService.uploadFile({ file, fileId });

        const document = await this.prismaService.document.create({
            data: {
                name,
                description,
                fileId,
                fileUrl,
                fileSize: file.size,
                fileType: 'PDF',
                organizationId,
            }
        })
        return document;
    }

    public async getByOrganization(organizationSlug: string) {
        const documents = await this.prismaService.document.findMany({
            where: {
                organization: {
                    slug: organizationSlug
                }
            }
        })
        return documents;
    }

}