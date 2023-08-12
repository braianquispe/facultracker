export type PaginatedResponse<TEntity extends Record<string, unknown>> = {
  items: TEntity[];
  page: number;
  perPage: number;
  rowsNumber: number;
};
