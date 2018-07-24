import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';

import {EnfermedadesModel} from '../models/enfermedades.model';
import {EnfermedadesFilter} from '../models/enfermedades.filter';

import {EnfermedadesService} from '../services/enfermedades.service';
import {EnfermedadesResponse} from '../models/enfermedades.response';
import {SintomasService} from '../services/sintomas.service';
import {SintomasModel} from '../models/sintomas.model';
import {PreguntasModel} from '../models/preguntas.model';
import {PreguntasService} from '../services/preguntas.service';
import {RespuestasModel} from '../models/respuestas.model';
import {forkJoin} from 'rxjs';
import {ConflictosResponse} from '../models/conflictos.response';

@Component({
  selector: 'app-enfermedades',
  templateUrl: './enfermedades.component.html',
  styleUrls: ['./enfermedades.component.css']
})
export class EnfermedadesComponent implements OnInit {

  public isCollapsed = true;
  newEnfermedades = new EnfermedadesModel();
  data: EnfermedadesResponse;
  conflictos: ConflictosResponse[];
  filter: EnfermedadesFilter;
  sintomas: SintomasModel[];
  preguntas: PreguntasModel[];
  dropdownSettings = {};

  ngOnInit() {

    forkJoin(
      this.sintomasService.getAll(),
      this.preguntasService.getAll()
    ).subscribe(result => {
      this.sintomas = result[0].sintomas;
      this.preguntas = result[1].preguntas;
      this.newEnfermedades.respuestas = result[1].preguntas.map(item => new RespuestasModel(item));
    }, err => console.error(err));

    this.dropdownSettings = {
      singleSelection: false,
      idField: '_id',
      textField: 'nombre',
      selectAllText: 'Seleccionar todo',
      unSelectAllText: 'Deseleccionar Todo',
      searchPlaceholderText: 'Buscar',
      allowSearchFilter: true
    };
  }

  constructor(private enfermedadesService: EnfermedadesService, private fb: FormBuilder,
              private sintomasService: SintomasService, private preguntasService: PreguntasService) {
    this.filter = new EnfermedadesFilter();
    this.loadData();
  }

  reset() {
    this.newEnfermedades._id = undefined;
    this.newEnfermedades.nombre = '';
    this.newEnfermedades.descripcion = '';
    this.newEnfermedades.tratamiento = '';
    this.newEnfermedades.sintomas = [];
    this.newEnfermedades.respuestas = this.newEnfermedades.respuestas.map(item => {
      item.respuesta = '?';
      return item;
    });
    console.log(this.newEnfermedades.respuestas);
  }

  submit() {
    if (this.newEnfermedades._id) {
      // Update
      this.enfermedadesService.update(this.newEnfermedades).subscribe(
        () => this.loadData()
      );

    } else {
      // Create
      this.enfermedadesService.add(this.newEnfermedades).subscribe(
        () => this.loadData()
      );
    }
    this.reset();
  }

  edit(enfermedad) {
    this.newEnfermedades._id = enfermedad._id;
    this.newEnfermedades.nombre = enfermedad.nombre;
    this.newEnfermedades.descripcion = enfermedad.descripcion;
    this.newEnfermedades.tratamiento = enfermedad.tratamiento;
    this.newEnfermedades.sintomas = enfermedad.sintomas;
    this.newEnfermedades.respuestas = enfermedad.respuestas;
    this.isCollapsed = false;
  }

  delete(id) {
    this.enfermedadesService.delete(id).subscribe(res => {
      this.loadData();
    });
  }

  loadData() {
    this.enfermedadesService
      .get(this.filter)
      .subscribe((data: EnfermedadesResponse) => {
        this.data = data;
      });

    this.enfermedadesService
      .getConflictos()
      .subscribe((data: ConflictosResponse[]) => {
        this.conflictos = data;
        console.log(data);
      });
  }

  paginacion(index) {
    this.filter.pagination.page = this.filter.pagination.page + index;
    this.loadData();
  }

  getSintomas(sintomas: SintomasModel[]) {
    return sintomas.map(item => item.nombre).join(', ');
    // return Array.prototype.map.call(sintomas, function(item) { return item.nombre; }).join(', ');
  }

  getPreguntas(preguntas: PreguntasModel[]) {
    return Array.prototype.map.call(preguntas, function (item) {
      return item.descripcion;
    }).join(', ');
  }

  setRespuesta(id, respuesta) {
    this.newEnfermedades.respuestas.forEach(function(item, index, array) {
      if ( item.pregunta._id === id ) {
        item.respuesta = respuesta;
      }
    });
  }

  // Metodo para evaluar si una determinada enfermedad tiene preguntas pendientes de contestar
  preguntaPendiente(enfermedad: EnfermedadesModel) {
    const filtro = enfermedad.respuestas.filter( respuesta => respuesta.respuesta === '?');
    if ( filtro.length > 0 ) {
      return true;
    } else {
      return false;
    }
  }

  filterStatus(status) {
    if ( this.filter.status === status) {
      this.filter.status = '';
    } else {
      this.filter.status = status;
    }
    this.loadData();
  }
}
