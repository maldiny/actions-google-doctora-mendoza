import {ChangeDetectorRef, Component, OnInit, Input} from '@angular/core';
import {RespuestasModel} from '../../models/respuestas.model';

@Component({
  selector: 'app-response-component',
  templateUrl: './response.component.html',
})
export class ResponseComponent implements OnInit {

  @Input() respuesta: RespuestasModel;

  constructor() {
  }

  ngOnInit() {
  }

  setRespuesta(item) {
    this.respuesta.respuesta = item;
  }
}
