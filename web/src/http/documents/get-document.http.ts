import type { DocumentStatus, DocumentType } from "@/@types/document";
import { api } from "@/config/api.config";

type Response = {
    document: {
        id: string;
        name: string;
        description: string;
        status: DocumentStatus;
        fileSize: number;
        fileType: DocumentType;
        fileUrl: string;
        fileId: string;
        uploadedAt: string;
        updatedAt: string;
        organizationId: string;
    }
}

export async function getDocument(documentId: string) {
    const result = await api.get(
        `documents/${documentId}`
    ).json<Response>();
    return result;
}