export type PaginatedResponse<T> = {
  items: T[];
  total: number;
  totalPages: number;
  page: number;
  perPage: number;
};

export const OrderTypes = {
  Asc: "asc",
  Desc: "desc",
} as const;

export type OrderType = (typeof OrderTypes)[keyof typeof OrderTypes];
