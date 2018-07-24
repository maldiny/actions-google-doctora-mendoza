import { PreguntasModel } from './preguntas.model';

export class RespuestasModel {
  pregunta: PreguntasModel;
  respuesta: string;

  constructor(pregunta: PreguntasModel) {
    if (pregunta) {
      this.pregunta = pregunta;
      this.respuesta = '?';
    }
  }
}
