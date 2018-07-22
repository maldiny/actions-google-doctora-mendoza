import { PreguntasModel } from './preguntas.model';

export class RespuestasModel {
  _id: Number;
  pregunta: PreguntasModel;
  respuesta: string;

  constructor(pregunta: PreguntasModel) {
    if (pregunta) {
      this.pregunta = pregunta;
      this.respuesta = '?';
    }
  }
}
