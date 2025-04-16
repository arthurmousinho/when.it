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

type Resquest = {
    organizationSlug: string;
    documentId: string;
}

export async function getDocument(request: Resquest) {
    const { organizationSlug, documentId } = request;

    const result = await api.get(
        `documents/organization/${organizationSlug}/${documentId}`
    ).json<Response>();
    return result;
}