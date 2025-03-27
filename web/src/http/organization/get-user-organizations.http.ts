import { api } from "@/config/api.config";

type Response = {
    organizations: {
        id: string;
        name: string;
        slug: string;
        membersCount: number;
        documentsCount: number;
        chatsCount: number;
        managerId: string;
    }[]
}

export async function getUserOrganizations() {
    const result = await api.get('organizations').json<Response>();
    return result;
}