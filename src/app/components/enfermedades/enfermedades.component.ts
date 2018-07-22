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

@Component({
  selector: 'app-enfermedades',
  templateUrl: './enfermedades.component.html',
  styleUrls: ['./enfermedades.component.css']
})
export class EnfermedadesComponent implements OnInit{

  angForm: FormGroup;
  data: EnfermedadesResponse;
  filter: EnfermedadesFilter;
  optionsModel: number[];
  sintomas: SintomasModel[];
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};

  ngOnInit () {
    this.sintomasService.getAll().subscribe(data => {
      this.sintomas = data.sintomas;
      console.log(this.sintomas);
    });

    // this.selectedItems = [
    //   { item_id: 3, item_text: 'Pune' },
    //   { item_id: 4, item_text: 'Navsari' }
    // ];
    this.dropdownSettings = {
      singleSelection: false,
      idField: '_id',
      textField: 'nombre',
      selectAllText: 'Seleccionar todo',
      unSelectAllText: 'Deseleccionar Todo',
      itemsShowLimit: 5,
      allowSearchFilter: true
    };
  }
  onItemSelect (item: any) {
    console.log(item);
  }
  onSelectAll (items: any) {
    console.log(items);
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
      tratamiento: ['', Validators.required ],
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
        tratamiento: this.angForm.controls['tratamiento'].value
      };
      this.enfermedadesService.update(obj).subscribe(
        () => this.loadData()
      );

    } else {
      // Create
      this.enfermedadesService.add(this.angForm.controls['nombre'].value,
        this.angForm.controls['descripcion'].value,
        this.angForm.controls['tratamiento'].value).subscribe(
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

  select(){
    console.log('select');
  }
}
