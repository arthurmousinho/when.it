import ky from 'ky';
import { env } from './env.config';
import { getCookie } from 'cookies-next'
import { AUTH_TOKEN_KEY } from '@/constants/auth-token-key';

export const api = ky.create({
    prefixUrl: env.NEXT_PUBLIC_API_URL,
    hooks: {
        beforeRequest: [
            async (request) => {
                let token: string | undefined

                const isServerSide = typeof window !== 'undefined'

                if (isServerSide) {
                    token = getCookie(AUTH_TOKEN_KEY) as string | undefined
                } else {
                    const { cookies: getServerCookies } = await import('next/headers');
                    const cookieStore = await getServerCookies();
                    token = cookieStore.get(AUTH_TOKEN_KEY)?.value;
                }

                if (token) {
                    request.headers.set('Authorization', `Bearer ${token}`)
                }
            },
        ],
        afterResponse: [
            // async (_request, _options, response) => {
            //     const isServerSide = typeof window !== 'undefined';
            //     if (isServerSide && !response.ok) {
            //         window.location.href = '/404';
            //     }
            // },
        ],
    },
    throwHttpErrors: true,
})