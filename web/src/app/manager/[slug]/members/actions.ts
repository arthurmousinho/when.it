'use server'

import { HTTPError } from 'ky';
import { sendOrganizationInvite } from '@/http/invite/send-organization-invite.http';
import type { FormActionResponse } from '@/@types/form-action-response';
import type { MemberRole } from '@/@types/member';

export type SendInviteActionData = {
    email: string;
    role: MemberRole;
    organizationSlug: string;
}

export async function sendInviteAction(data: SendInviteActionData): Promise<FormActionResponse> {
    try {
        await sendOrganizationInvite(
            data.organizationSlug,
            {
                email: data.email,
                role: data.role,
            }
        )

        return {
            message: 'Convite enviado com sucesso',
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