import { getUserProfile } from "@/http/auth/get-user-profile.http";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const AUTH_TOKEN_KEY = 'whenit_token';

export async function isAuthenticated() {
    const token = (await cookies()).get(AUTH_TOKEN_KEY)?.value;
    return Boolean(token);
}

export async function auth() {
    const token = (await cookies()).get(AUTH_TOKEN_KEY)?.value;

    if (!token) {
        redirect('/auth/login');
    }

    try {
        const data = await getUserProfile();
        return data;
    } catch (error) {
        console.error('Profile error:', error);
    }

    redirect('/auth/signout');
}