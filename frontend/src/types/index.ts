export interface User {
  username: string;
}

export interface Notice {
  id: number;
  title: string;
  content: string;
  authorUsername: string;
  createdAt: string;
  _links?: {
    self: { href: string };
    [key: string]: { href: string };
  };
}

export interface PagedResponse<T> {
  _embedded: {
    notices: T[];
  };
  _links: {
    self: { href: string };
    next?: { href: string };
    prev?: { href: string };
  };
  page: {
    size: number;
    totalElements: number;
    totalPages: number;
    number: number;
  };
}
