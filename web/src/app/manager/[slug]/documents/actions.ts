'use server'

import { HTTPError } from 'ky';
import { uploadDocument } from '@/http/documents/upload-document.http';
import type { FormActionResponse } from '@/@types/form-action-response';

export type UploadDocumentActionData = {
   name: string;
   description: string;
   file: File;
   organizationSlug: string;
}

export async function uploadDocumentAction(data: UploadDocumentActionData): Promise<FormActionResponse> {
    try {
        await uploadDocument({
            name: data.name,
            description: data.description,
            file: data.file,
            organizationSlug: data.organizationSlug,
        })

        return {
            message: 'Documento enviado com sucesso',
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