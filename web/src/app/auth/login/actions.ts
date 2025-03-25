'use server'

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { loginUserRequest } from '@/http/user/login-user.http';
import { HTTPError } from 'ky';

type Params = {
    email: string;
    password: string;
}

export async function loginUserAction(data: Params) {
    try {
        const { token } = await loginUserRequest({
            email: data.email,
            password: data.password
        });

        (await cookies()).set('whenit_token', token, {
            path: '/',
            maxAge: 60 * 60 * 24, // 24 hours
        });

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

    redirect('/');
}