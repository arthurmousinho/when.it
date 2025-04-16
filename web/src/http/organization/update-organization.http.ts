import { api } from "@/config/api.config";

type Request = {
    organizationSlug: string;
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

export async function updateOrganization(request: Request) {
    const { organizationSlug, name, description } = request;

    const result = await api.put(
        `organizations/${organizationSlug}`,
        { json: { name, description } }
    ).json<Response>();

    return result;
}