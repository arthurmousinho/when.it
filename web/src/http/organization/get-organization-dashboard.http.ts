import { api } from "@/config/api.config";

type Response = {
    dashboard: {
        organization: {
            id: string;
            slug: string;
            name: string;
        },
        documents: {
            totalCount: number;
            uploadedCount: number;
            embeddedCount: number;
            totalFileSize: number;
        },
        members: {
            totalCount: number;
        },
        messages: {
            totalCount: number;
            recentMemberMessages: {
                id: string;
                content: string;
                createdAt: string;
                chat: {
                    id: string;
                    member: {
                        user: {
                            name: string;
                            email: string;
                        }
                    }
                }
            }[]
        },
        chats: {
            totalCount: number;
        },
        weeklyUsage: {
            date: string;
            messagesCount: number;
        }[]
    }
}

export async function getOrganizationDashboard(slug: string) {
    const result = await api.get(`organizations/${slug}/dashboard`).json<Response>();
    return result;
}   