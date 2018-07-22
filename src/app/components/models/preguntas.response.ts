import { PreguntasModel } from './preguntas.model';

export class PreguntasResponse {
  preguntas: PreguntasModel[];
  count: Number;
  perPage: Number;
  page: Number;
}
