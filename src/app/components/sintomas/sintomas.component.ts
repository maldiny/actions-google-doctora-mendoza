import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';

import { SintomasModel } from '../models/sintomas.model';
import { SintomasFilter } from '../models/sintomas.filter';

import { SintomasService } from '../services/sintomas.service';
import {SintomasResponse} from '../models/sintomas.response';

@Component({
  selector: 'app-sintomas',
  templateUrl: './sintomas.component.html',
  styleUrls: ['./sintomas.component.css']
})
export class SintomasComponent {

  angForm: FormGroup;
  data: SintomasResponse;
  filter: SintomasFilter;

  constructor(private sintomasService: SintomasService, private fb: FormBuilder) {
    this.filter = new SintomasFilter();
    this.createForm();
    this.loadData();
  }

  createForm() {
    this.angForm = this.fb.group({
      _id: [],
      nombre: ['', Validators.required ]
    });
  }

  reset() {
    this.angForm.reset();
    // this.angForm.controls['_id'].setValue('');
    // this.angForm.controls['nombre'].setValue('');
  }

  submit() {
    const obj = this.angForm.value;
    const action = obj._id ? this.sintomasService.update(obj) : this.sintomasService.add(obj.nombre);
    action.subscribe(
      () => this.loadData()
    );
    /*if (obj._id) {
      this.sintomasService.update(obj).subscribe(
        () => this.loadData()
      );

    } else {
      // Create
      this.sintomasService.add(obj.nombre).subscribe(
        () => this.loadData()
      );
    }*/
    this.angForm.reset();
  }

  edit(sintoma) {
    this.angForm.controls['_id'].setValue(sintoma._id);
    this.angForm.controls['nombre'].setValue(sintoma.nombre);
  }

  delete(id) {
    this.sintomasService.delete(id).subscribe(res => {
      this.loadData();
    });
  }

  loadData() {
    this.sintomasService
      .get(this.filter)
      .subscribe((data: SintomasResponse) => {
        this.data = data;
      });
  }

  paginacion(index) {
    this.filter.pagination.page = this.filter.pagination.page + index;
    this.loadData();
  }
}
