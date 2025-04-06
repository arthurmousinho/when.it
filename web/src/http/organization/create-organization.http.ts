import { api } from "@/config/api.config";

type Payload = {
    name: string;
    description: string;
}

type Response = {
    organization: {
        id: string;
        name: string;
        slug: string;
        description: string;
    }
}

export async function createOrganization(payload: Payload) {
    const result = await api.post(
        'organizations',
        { json: payload }
    ).json<Response>();

    return result;
}