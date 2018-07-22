import {SintomasModel} from './sintomas.model';
import {RespuestasModel} from './respuestas.model';

export class EnfermedadesModel {
  _id: Number;
  nombre: String;
  descripcion: String;
  tratamiento: String;
  sintomas: SintomasModel[];
  respuestas: RespuestasModel[];

  constructor() {
    this.sintomas  = new Array<SintomasModel>();
    this.respuestas = new Array<RespuestasModel>();
  }
}
