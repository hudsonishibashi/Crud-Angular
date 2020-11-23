export interface ICategory {
    id: number;
    name: string;
}

export interface Sort {
    sorted: boolean;
    unsorted: boolean;
    empty: boolean;
}

export interface Pageable {
    sort: Sort;
    offset: number;
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    unpaged: boolean;
}

export interface Sort2 {
    sorted: boolean;
    unsorted: boolean;
    empty: boolean;
}

export interface ResponseICategory {
    content: ICategory[];
    pageable: Pageable;
    totalElements: number;
    last: boolean;
    totalPages: number;
    size: number;
    number: number;
    numberOfElements: number;
    sort: Sort2;
    first: boolean;
    empty: boolean;
}

export interface ICreateCategory {
    name: string;
}