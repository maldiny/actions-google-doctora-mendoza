import { EnfermedadesModel } from './enfermedades.model';

export interface ConflictosResponse {
  _id: Number;
  enfermedades: EnfermedadesModel[];
  count: Number;
}
