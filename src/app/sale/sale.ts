export interface SaleHasProduct {
    idSale: number;
    idProduct: number;
    qtdProduct: number;
}

export interface ISale {
    id: number;
    totalValue: number;
    data: any;
    idClient: number;
    clientName: string;
    saleHasProducts: SaleHasProduct[];
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

export interface IResponseSale {
    content: ISale[];
    pageable: Pageable;
    totalPages: number;
    last: boolean;
    totalElements: number;
    size: number;
    number: number;
    sort: Sort2;
    first: boolean;
    numberOfElements: number;
    empty: boolean;
}

export interface ICreateSale {
    totalValue: number;
    idClient: number;
    saleHasProducts: SaleHasProduct[];
}
