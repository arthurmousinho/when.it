import type { DocumentStatus, DocumentType } from "@/@types/document";
import { api } from "@/config/api.config";

type Response = {
    documents: {
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
    }[]
}

export async function getOrganizationDocuments(orgSlug: string) {
    const result = await api.get(
        `documents/organization/${orgSlug}`
    ).json<Response>();
    return result;
}