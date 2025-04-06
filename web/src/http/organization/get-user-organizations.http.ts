import type { MemberRole } from "@/@types/member";
import { api } from "@/config/api.config";

type Response = {
    organizations: {
        id: string;
        name: string;
        slug: string;
        chatsCount: number;
        role: MemberRole;
    }[]
}

export async function getUserOrganizations() {
    const result = await api.get('organizations').json<Response>();
    return result;
}