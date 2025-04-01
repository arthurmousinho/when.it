import { api } from "@/config/api.config";

export async function embedDocument(documentId: string): Promise<void> {
    await api.post(`documents/${documentId}/embed`).json<Response>();
}