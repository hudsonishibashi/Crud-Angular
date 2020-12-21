export interface IClient {
  id: number;
  name: string;
  phone: string;
  email: string;
  password: string;
  admin: boolean;
}

export interface Sort {
  unsorted: boolean;
  sorted: boolean;
  empty: boolean;
}

export interface Pageable {
  sort: Sort;
  offset: number;
  pageNumber: number;
  pageSize: number;
  unpaged: boolean;
  paged: boolean;
}

export interface Sort2 {
  unsorted: boolean;
  sorted: boolean;
  empty: boolean;
}

export interface ResponseIClient {
  content: IClient[];
  pageable: Pageable;
  last: boolean;
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  first: boolean;
  sort: Sort2;
  numberOfElements: number;
  empty: boolean;
}

export interface CreateIClient {
  name: string;
  phone: string;
  email: string;
  password: string;
  admin: boolean;
}
export interface ILoginClient {
  email: string;
  password: string;
}

export interface IResponseLoginClient {
  id: number;
  name: string;
  email: string;
  admin: boolean;
  token: string;
}

export interface IUpdateClient {
  id: number;
  name: string;
  phone: string;
  email: string;
  admin: boolean;
}
