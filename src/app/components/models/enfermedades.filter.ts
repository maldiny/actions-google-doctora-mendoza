import { PaginationFilter } from './pagination.filter';

export class EnfermedadesFilter {

  _id: Number;
  nombre: String;
  descripcion: String;
  tratamiento: String;
  pagination: PaginationFilter;
  status: String;

  constructor() {
    this.pagination = new PaginationFilter();
  }
}
