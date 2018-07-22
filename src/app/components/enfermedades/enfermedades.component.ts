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

@Component({
  selector: 'app-enfermedades',
  templateUrl: './enfermedades.component.html',
  styleUrls: ['./enfermedades.component.css']
})
export class EnfermedadesComponent implements OnInit {

  angForm: FormGroup;
  newEnfermedades = new EnfermedadesModel();
  data: EnfermedadesResponse;
  filter: EnfermedadesFilter;
  optionsModel: number[];
  sintomas: SintomasModel[];
  dropdownList = [];
  dropdownSettings = {};

  ngOnInit () {
    this.sintomasService.getAll().subscribe(data => {
      this.sintomas = data.sintomas;
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

  onSelect (item: any) {
    this.newEnfermedades.sintomas.push(item);
  }
  onSelectAll (items: any) {
    this.newEnfermedades.sintomas = items;
  }
  onDeSelect (item: any) {
    this.newEnfermedades.sintomas = this.newEnfermedades.sintomas.filter(function( obj ) {
      return obj._id !== item._id;
    });
  }
  onDeSelectAll (items: any) {
    this.newEnfermedades.sintomas = [];
  }

  constructor(private enfermedadesService: EnfermedadesService, private fb: FormBuilder, private sintomasService: SintomasService) {
    this.filter = new EnfermedadesFilter();
    this.createForm();
    this.loadData();
  }

  createForm() {
    this.angForm = this.fb.group({
      _id: [],
      nombre: ['', Validators.required ],
      descripcion: ['', Validators.required ],
      tratamiento: ['', Validators.required ]
    });
  }

  reset() {
    this.angForm.controls['_id'].setValue('');
    this.angForm.controls['nombre'].setValue('');
    this.angForm.controls['descripcion'].setValue('');
    this.angForm.controls['tratamiento'].setValue('');
  }

  submit() {
    if (this.angForm.controls['_id'].value) {
      // Update
      const obj = {
        _id: this.angForm.controls['_id'].value,
        nombre: this.angForm.controls['nombre'].value,
        descripcion: this.angForm.controls['descripcion'].value,
        tratamiento: this.angForm.controls['tratamiento'].value,
        sintomas: this.newEnfermedades.sintomas
      };
      this.enfermedadesService.update(obj).subscribe(
        () => this.loadData()
      );

    } else {
      // Create
      this.newEnfermedades.nombre = this.angForm.controls['nombre'].value;
      this.newEnfermedades.descripcion = this.angForm.controls['descripcion'].value;
      this.newEnfermedades.tratamiento = this.angForm.controls['tratamiento'].value;
      this.enfermedadesService.add(this.newEnfermedades).subscribe(
        () => this.loadData()
      );
    }
    this.angForm.reset();
  }

  edit(enfermedad) {
    this.angForm.controls['_id'].setValue(enfermedad._id);
    this.angForm.controls['nombre'].setValue(enfermedad.nombre);
    this.angForm.controls['descripcion'].setValue(enfermedad.descripcion);
    this.angForm.controls['tratamiento'].setValue(enfermedad.tratamiento);
    this.newEnfermedades.sintomas = enfermedad.sintomas;
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
