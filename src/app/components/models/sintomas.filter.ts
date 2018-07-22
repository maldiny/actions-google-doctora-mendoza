import { PaginationFilter } from './pagination.filter';

export class SintomasFilter {

  _id: Number;
  nombre: String;
  pagination: PaginationFilter;

  constructor() {
    this.pagination = new PaginationFilter();
  }
}
