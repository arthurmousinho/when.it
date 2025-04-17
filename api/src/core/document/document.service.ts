import { Injectable, NotFoundException } from "@nestjs/common";
import { randomUUID } from "node:crypto";
import { PrismaService } from "src/infra/database/prisma.service";
import { StorageService } from "src/infra/storage/storage.service";
import { AIModelService } from "src/infra/ai/ai-model.service";
import { VectorStoreService } from "src/infra/ai/vector-store.service";
import type { UploadDocumentDTO } from "./dtos/upload-document.dto";

@Injectable()
export class DocumentService {

    constructor(
        private readonly prismaService: PrismaService,
        private readonly storageService: StorageService,
        private readonly vectorStoreService: VectorStoreService,
        private readonly aiModelService: AIModelService
    ) { }

    public async upload(data: UploadDocumentDTO & { organizationSlug: string }) {
        const { name, description, file, organizationSlug } = data;

        const fileId = randomUUID();
        const fileUrl = await this.storageService.uploadFile({
            file,
            fileId,
            bucket: 'DOCUMENTS'
        });

        const document = await this.prismaService.document.create({
            data: {
                name,
                description,
                fileId,
                fileUrl,
                fileSize: file.size,
                fileType: 'PDF',
                organization: {
                    connect: {
                        slug: organizationSlug
                    }
                }
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

    public async getById(documentId: string) {
        const document = await this.prismaService.document.findUnique({
            where: {
                id: documentId
            }
        });
        return document;
    }

    public async getByFileId(fileId: string) {
        return await this.prismaService.document.findUnique({
            where: { fileId }
        });
    }

    public async embedDocument(documentId: string) {
        const document = await this.getById(documentId);

        if (!document) {
            throw new NotFoundException('Documento não encontrado');
        }

        if (document.status === 'EMBEDDED') {
            throw new Error('Documento já está integrado');
        }

        const fileContent = await this.storageService.getFileContent(document.fileUrl);

        const { embedding, chunks } = await this.aiModelService.generateEmbedding(fileContent);

        await this.vectorStoreService.upsert(
            [{
                id: document.fileId,
                values: embedding,
                metadata: {
                    name: document.name,
                    organizationId: document.organizationId,
                    chunks: chunks,
                    description: document.description,
                }
            }],
        );

        const updatedDocument = await this.prismaService.document.update({
            where: {
                id: document.id
            },
            data: {
                status: 'EMBEDDED',
                updatedAt: new Date()
            }
        });

        return updatedDocument;
    }

    public async deleteDocument(documentId: string) {
        const document = await this.getById(documentId);

        if (!document) {
            throw new NotFoundException('Documento não encontrado');
        }

        await this.storageService.deleteFile({
            fileId: document.fileId,
            bucket: 'DOCUMENTS'
        });

        if (document.status === 'EMBEDDED') {
            await this.vectorStoreService.delete(document.fileId);
        }

        await this.prismaService.document.delete({
            where: {
                id: documentId
            }
        });
    }

    public async deleteAllOrganizationDocuments(organizationSlug: string) {
        const organizationDocuments = await this.getByOrganization(organizationSlug);

        if (organizationDocuments.length === 0) {
            return;
        }

        await Promise.all(organizationDocuments.map(doc => this.deleteDocument(doc.id)));
    }

}