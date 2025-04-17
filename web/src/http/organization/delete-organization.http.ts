import { api } from "@/config/api.config";

export async function deleteOrganization(slug: string) {
    await api.delete(`organizations/${slug}`);
}   