import { api } from "@/config/api.config";

type Payload = {
    name: string;
    description: string;
    file: File;
    organizationSlug: string;
};

export async function uploadDocument(payload: Payload): Promise<void> {
    const { name, description, organizationSlug, file } = payload;

    const formData = new FormData();

    formData.append("name", name);
    formData.append("description", description);
    formData.append("file", file);

    await api.post(`documents/organization/${organizationSlug}/upload`, {
        body: formData
    }).json<Response>();
}