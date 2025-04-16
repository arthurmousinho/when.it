import { api } from "@/config/api.config";

type Response = {
    organization: {
        id: string;
        name: string;
        slug: string;
        description: string;
        createdAt: string;
        updatedAt: string;
    }
}

export async function getOrganization(slug: string) {
    const result = await api.get(`organizations/${slug}`).json<Response>();
    return result;
}   