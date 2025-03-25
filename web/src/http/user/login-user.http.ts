import { api } from "@/config/api.config";

type Payload = {
    email: string;
    password: string;
}

type Response = {
    token: string;
}

export async function loginUserRequest(payload: Payload) {
    const result = await api.post(
        'auth/login',
        { json: payload }
    ).json<Response>();

    return result;
}