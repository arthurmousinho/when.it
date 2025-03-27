'use server'

import { HTTPError } from 'ky';
import { signUpUserRequest } from '@/http/auth/sign-up-user.http';

type Params = {
    name: string;
    email: string;
    password: string;
}

export async function signUpUserAction(data: Params) {
    try {
        await signUpUserRequest({
            name: data.name,
            email: data.email,
            password: data.password
        });

        return {
            message: 'Cadastro realizado com sucesso',
            success: true
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