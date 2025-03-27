import { api } from "@/config/api.config";

type Response = {
    user: {
        id: string;
        name: string;
        email: string;
    }
}

export async function getUserProfile() {
    const result = await api.get('auth/profile').json<Response>();
    return result;
}