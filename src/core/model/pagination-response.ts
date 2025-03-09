export interface PaginationResponse<T> {
  data: T[];
  total: number;
  currentPage: number;
  itemsPerPage: number;
}
