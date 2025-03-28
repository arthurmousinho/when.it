'use server'

import type { FormActionResponse } from "@/@types/form-action-response";
import { createOrganization } from "@/http/organization/create-organization.http";
import { HTTPError } from "ky";

type CreateOrganizationParams = {
    name: string;
}

export async function createOrganizationAction(
    data: CreateOrganizationParams
): Promise<FormActionResponse> {

    try {
        await createOrganization(data);

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