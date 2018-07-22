import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';

import { PreguntasModel } from '../models/preguntas.model';
import { PreguntasFilter } from '../models/preguntas.filter';

import { PreguntasService } from '../services/preguntas.service';
import {PreguntasResponse} from '../models/preguntas.response';

@Component({
  selector: 'app-preguntas',
  templateUrl: './preguntas.component.html',
  styleUrls: ['./preguntas.component.css']
})
export class PreguntasComponent {

  angForm: FormGroup;
  data: PreguntasResponse;
  filter: PreguntasFilter;

  constructor(private preguntasService: PreguntasService, private fb: FormBuilder) {
    this.filter = new PreguntasFilter();
    this.createForm();
    this.loadData();
  }

  createForm() {
    this.angForm = this.fb.group({
      _id: [],
      descripcion: ['', Validators.required ]
    });
  }

  reset() {
    this.angForm.controls['_id'].setValue('');
    this.angForm.controls['descripcion'].setValue('');
  }

  submit() {
    if (this.angForm.controls['_id'].value) {
      // Update
      const obj = {
        _id: this.angForm.controls['_id'].value,
        descripcion: this.angForm.controls['descripcion'].value
      };
      this.preguntasService.update(obj).subscribe(
        () => this.loadData()
      );

    } else {
      // Create
      this.preguntasService.add(this.angForm.controls['descripcion'].value).subscribe(
        () => this.loadData()
      );
    }
    this.angForm.reset();
  }

  edit(pregunta) {
    this.angForm.controls['_id'].setValue(pregunta._id);
    this.angForm.controls['descripcion'].setValue(pregunta.descripcion);
  }

  delete(id) {
    this.preguntasService.delete(id).subscribe(res => {
      this.loadData();
    });
  }

  loadData() {
    this.preguntasService
      .get(this.filter)
      .subscribe((data: PreguntasResponse) => {
        this.data = data;
      });
  }

  paginacion(index) {
    this.filter.pagination.page = this.filter.pagination.page + index;
    this.loadData();
  }
}
