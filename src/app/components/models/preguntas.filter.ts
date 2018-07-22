import { PaginationFilter } from './pagination.filter';

export class PreguntasFilter {

  _id: Number;
  descripcion: String;
  pagination: PaginationFilter;

  constructor() {
    this.pagination = new PaginationFilter();
  }
}
