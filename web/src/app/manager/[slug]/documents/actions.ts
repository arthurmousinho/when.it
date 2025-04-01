'use server'

import { HTTPError } from 'ky';
import { uploadDocument } from '@/http/documents/upload-document.http';
import type { FormActionResponse } from '@/@types/form-action-response';
import { embedDocument } from '@/http/documents/embed-document.http';
import { revalidateTag } from 'next/cache';

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

        revalidateTag('documents');

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

export type EmbedDocumentActionData = {
    documentId: string;
}

export async function embedDocumentAction(data: EmbedDocumentActionData): Promise<FormActionResponse> {
    try {
        await embedDocument(data.documentId)

        return {
            message: 'Documento integrado com sucesso',
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