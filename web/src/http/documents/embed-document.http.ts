import { api } from "@/config/api.config";

type Request = {
    organizationSlug: string;
    documentId: string;
}

export async function embedDocument(params: Request): Promise<void> {
    const { organizationSlug, documentId } = params;
    await api.post(`documents/organization/${organizationSlug}/${documentId}/embed`).json<Response>();
}