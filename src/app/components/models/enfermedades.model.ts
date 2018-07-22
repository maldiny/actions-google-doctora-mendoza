import {SintomasModel} from './sintomas.model';
import {PreguntasModel} from './preguntas.model';

export class EnfermedadesModel {
  _id: Number;
  nombre: String;
  descripcion: String;
  tratamiento: String;
  sintomas: SintomasModel[];
  preguntas: PreguntasModel[];

  constructor() {
    this.sintomas  = new Array<SintomasModel>();
    this.preguntas = new Array<PreguntasModel>();
  }
}
