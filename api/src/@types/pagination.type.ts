export type PaginatedResponse<T> = {
    data: T[];
    meta: {
        total: number;
        limit: number;
        page: number;
        lastPage: number;
        hasNextPage: boolean;
        hasPreviousPage: boolean;
    }
}

export type PaginationRequest = {
    page: number;
    limit: number;
}