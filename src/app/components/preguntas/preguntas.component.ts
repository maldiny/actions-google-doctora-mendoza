import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';

import { PreguntasModel } from '../models/preguntas.model';

import { PreguntasService } from '../services/preguntas.service';

@Component({
  selector: 'app-preguntas',
  templateUrl: './preguntas.component.html',
  styleUrls: ['./preguntas.component.css']
})
export class PreguntasComponent implements OnInit {

  angForm: FormGroup;
  adunits: PreguntasModel[];

  constructor(private preguntasService: PreguntasService, private fb: FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.angForm = this.fb.group({
      unit_name: ['', Validators.required ],
      unit_price: ['', Validators.required ]
    });
  }

  addAdUnit(unit_name, unit_price) {
    this.preguntasService.add(unit_name, unit_price);
  }

  ngOnInit() {
    this.preguntasService
      .getAdUnits()
      .subscribe((data: PreguntasModel[]) => {
        this.adunits = data;
      });
  }

}
