export type PaginatedMetadata = {
    total: number;
    page: number;
    limit: number;
    lastPage: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
}

export type PaginatedResponse<T> = {
    data: T[];
    meta: PaginatedMetadata;
}

export type PaginationRequest = {
    page: number;
    limit: number;
}