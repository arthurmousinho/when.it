'use server'

import { cookies } from 'next/headers';
import { loginUserRequest } from '@/http/auth/login-user.http';
import { HTTPError } from 'ky';
import { AUTH_TOKEN_KEY } from '../(auth)/auth';

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

        (await cookies()).set(AUTH_TOKEN_KEY, token, {
            path: '/',
            maxAge: 60 * 60 * 24, // 24 hours
        });

        return {
            message: 'Login realizado com sucesso',
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