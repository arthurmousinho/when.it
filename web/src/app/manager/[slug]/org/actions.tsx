'use server'

import type { FormActionResponse } from "@/@types/form-action-response";
import { deleteOrganization } from "@/http/organization/delete-organization.http";
import { HTTPError } from "ky";
import { revalidateTag } from "next/cache";

export async function deleteOrganizationAction(organizationSlug: string): Promise<FormActionResponse> {
    try {
        await deleteOrganization(organizationSlug);

        revalidateTag('organizations');

        return {
            message: 'Organização excluída com sucesso',
            success: true,
        }

    } catch (error) {

        if (error instanceof HTTPError) {
            const { message } = await error.response.json();
            return { message, success: false }
        }

        console.error(error);

        return {
            message: 'Erro inesperado, tente novamente mais tarde',
            success: false,
        }

    }
}