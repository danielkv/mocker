import { Pagination } from '@shared/interfaces/pagination';
import { PaginatedResponse } from '@shared/interfaces/responses';

export function buildPaginatedResponse<Item extends Record<string, any>>(
    items: Item[],
    totalItems: number,
    { page, numberOfItems }: Pagination,
): PaginatedResponse<Item> {
    const totalPages = Math.ceil(totalItems / numberOfItems);
    const nextPage = page + 1 < totalPages ? page + 1 : null;

    return {
        items,
        currentPage: page,
        totalItems,
        nextPage,
        totalPages,
    };
}

export function getLimitOffset({ page, numberOfItems }: Pagination): {
    limit: number;
    offset: number;
} {
    const offset = page * numberOfItems;
    const limit = numberOfItems;

    return {
        offset,
        limit,
    };
}

export function getPagination(
    requestQuery: Partial<Pagination>,
    defaultNumberOfItems = 20,
): Pagination {
    return {
        page: requestQuery.page || 0,
        numberOfItems: requestQuery.numberOfItems || defaultNumberOfItems,
    };
}
