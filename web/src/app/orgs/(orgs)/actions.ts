'use server'

import type { FormActionResponse } from "@/@types/form-action-response";
import { createOrganization } from "@/http/organization/create-organization.http";
import { updateOrganization } from "@/http/organization/update-organization.http";
import { HTTPError } from "ky";
import { revalidateTag } from "next/cache";

type CreateOrganizationParams = {
    name: string;
    description: string;
}

export async function createOrganizationAction(
    data: CreateOrganizationParams
): Promise<FormActionResponse> {

    try {
        await createOrganization(data);

        revalidateTag('organizations');

        return {
            message: 'Organização criada com sucesso',
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

type UpdateOrganizationParams = {
    organizationSlug: string;
    name: string;
    description: string;
}

export async function updateOrganizationAction(
    data: UpdateOrganizationParams
): Promise<FormActionResponse> {

    try {
        await updateOrganization(data);

        revalidateTag('organizations');

        return {
            message: 'Organização atualizada com sucesso',
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