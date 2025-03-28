import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/database/prisma.service";
import { CloudinaryService } from "./infra/claudinary.service";
import { randomUUID } from "node:crypto";
import { OrganizationService } from "../organization/organization.service";
import type { UploadDocumentDTO } from "./dtos/upload-document.dto";

@Injectable()
export class DocumentService {

    constructor(
        private readonly prismaService: PrismaService,
        private readonly cloudinaryService: CloudinaryService,
        private readonly organizationService: OrganizationService
    ) { }

    public async upload(data: UploadDocumentDTO & { organizationSlug: string }) {
        const { name, description, file, organizationSlug } = data;

        const organization = await this.organizationService.getBySlug(organizationSlug);
        if (!organization) {
            throw new NotFoundException('Organização não encontrada');
        }

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
                organizationId: organization.id,
            }
        });

        return document;
    }

    public async getByOrganization(organizationSlug: string) {
        const documents = await this.prismaService.document.findMany({
            where: {
                organization: {
                    slug: organizationSlug
                }
            },
            orderBy: {
                uploadedAt: 'desc'
            }
        })
        return documents;
    }

}