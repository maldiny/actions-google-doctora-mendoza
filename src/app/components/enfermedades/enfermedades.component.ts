import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';

import { EnfermedadesModel } from '../models/enfermedades.model';
import { EnfermedadesFilter } from '../models/enfermedades.filter';

import { EnfermedadesService } from '../services/enfermedades.service';
import {EnfermedadesResponse} from '../models/enfermedades.response';
import {SintomasService} from '../services/sintomas.service';
import {SintomasFilter} from '../models/sintomas.filter';
import {SintomasResponse} from '../models/sintomas.response';
import {SintomasModel} from '../models/sintomas.model';
import {PreguntasModel} from '../models/preguntas.model';
import {forEach} from '@angular/router/src/utils/collection';
import {PreguntasService} from '../services/preguntas.service';
import {RespuestasModel} from '../models/respuestas.model';

@Component({
  selector: 'app-enfermedades',
  templateUrl: './enfermedades.component.html',
  styleUrls: ['./enfermedades.component.css']
})
export class EnfermedadesComponent implements OnInit {

  newEnfermedades = new EnfermedadesModel();
  data: EnfermedadesResponse;
  filter: EnfermedadesFilter;
  sintomas: SintomasModel[];
  preguntas: PreguntasModel[];
  dropdownSettings = {};

  ngOnInit () {
    // Get all Sintomas
    this.sintomasService.getAll().subscribe(data => {
      this.sintomas = data.sintomas;
    });
    // Get all Preguntas
    this.preguntasService.getAll().subscribe(data => {
      this.preguntas = data.preguntas;
      this.newEnfermedades.respuestas = data.preguntas.map(item => new RespuestasModel(item));
      console.log(this.newEnfermedades);
    });

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
    this.newEnfermedades.respuestas.map(item => item.respuesta = '?');
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
  }

  paginacion(index) {
    this.filter.pagination.page = this.filter.pagination.page + index;
    this.loadData();
  }

  getSintomas(sintomas: SintomasModel[]) {
    return Array.prototype.map.call(sintomas, function(item) { return item.nombre; }).join(', ');
  }

  getPreguntas(preguntas: PreguntasModel[]) {
    return Array.prototype.map.call(preguntas, function(item) { return item.descripcion; }).join(', ');
  }

}
