import { SintomasModel } from './sintomas.model';

export class SintomasResponse {
  sintomas: SintomasModel[];
  count: Number;
  perPage: Number;
  page: Number;
}
