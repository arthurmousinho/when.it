import { api } from "@/config/api.config";

type Payload = {
    name: string;
    email: string;
    password: string;
}

type Response = {
    user: {
        id: string;
        name: string;
        email: string;
    }
}

export async function signUpUserRequest(payload: Payload) {
    const result = await api.post(
        'auth/signup',
        { json: payload }
    ).json<Response>();

    return result;
}