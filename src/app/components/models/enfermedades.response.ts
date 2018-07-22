import { EnfermedadesModel } from './enfermedades.model';

export interface EnfermedadesResponse {
  enfermedades: EnfermedadesModel[];
  count: Number;
  perPage: Number;
  page: Number;
}
