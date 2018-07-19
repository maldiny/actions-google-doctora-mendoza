import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { EnfermedadesComponent } from './components/enfermedades/enfermedades.component';
import { PreguntasComponent } from './components/preguntas/preguntas.component';
import { SintomasComponent } from './components/sintomas/sintomas.component';

import { EnfermedadesService } from './components/services/enfermedades.service';
import { SintomasService } from './components/services/sintomas.service';
import { PreguntasService } from './components/services/preguntas.service';

const routes: Routes = [
  {
    path: '',
    component: EnfermedadesComponent
  },
  {
    path: 'preguntas',
    component: PreguntasComponent
  },
  {
    path: 'sintomas',
    component: SintomasComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    EnfermedadesComponent,
    PreguntasComponent,
    SintomasComponent
  ],
  imports: [
    BrowserModule,
    SlimLoadingBarModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    EnfermedadesService,
    SintomasService,
    PreguntasService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
