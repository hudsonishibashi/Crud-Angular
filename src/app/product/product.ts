export interface IProduct {
    id: number;
    name: string;
    amount: number;
    value: number;
    category: number;
}

export interface Sort {
    sorted: boolean;
    unsorted: boolean;
    empty: boolean;
}

export interface Pageable {
    sort: Sort;
    offset: number;
    pageSize: number;
    pageNumber: number;
    paged: boolean;
    unpaged: boolean;
}

export interface Sort2 {
    sorted: boolean;
    unsorted: boolean;
    empty: boolean;
}

export interface IResponseProduct {
    content: IProduct[];
    pageable: Pageable;
    totalElements: number;
    totalPages: number;
    last: boolean;
    size: number;
    number: number;
    sort: Sort2;
    numberOfElements: number;
    first: boolean;
    empty: boolean;
}

export interface ICreateProduct {
    name: string;
    amount: number;
    value: number;
    category: number;
    saleHasProducts: any[];
}

