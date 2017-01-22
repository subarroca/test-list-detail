export class Pagination {
  page: number;
  pageSize: number;
  totalItems: number;

  constructor(options: {
    page?: number,
    pageSize?: number,
    totalItems?: number,
  } = {}) {
    this.page = options.page;
    this.pageSize = options.pageSize;
    this.totalItems = options.totalItems;
  }
}
