import { api } from "@/config/api.config";

type Payload = {
    name: string;
}

type Response = {
    name: string;
    id: string;
    createdAt: Date;
    updatedAt: Date;
    slug: string;
}

export async function createOrganization(payload: Payload) {
    const result = await api.post(
        'organizations',
        { json: payload }
    ).json<Response>();

    return result;
}