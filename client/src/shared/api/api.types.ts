export type PaginatedResponse<T> = {
  items: T[];
  total: number;
  totalPages: number;
  page: number;
  perPage: number;
};
