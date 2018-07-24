import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppLoadingService } from './components/utils/loading/app-loading.service';
import { AppLoadingComponent } from './components/utils/loading/app-loading.component';

import { AppComponent } from './app.component';
import { ResponseComponent } from './components/utils/response/response.component';
import { EnfermedadesComponent } from './components/enfermedades/enfermedades.component';
import { PreguntasComponent } from './components/preguntas/preguntas.component';
import { SintomasComponent } from './components/sintomas/sintomas.component';

import { EnfermedadesService } from './components/services/enfermedades.service';
import { SintomasService } from './components/services/sintomas.service';
import { PreguntasService } from './components/services/preguntas.service';

import { CeilPipe } from './components/pipes/ceil.pipe';

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
    AppLoadingComponent,
    SintomasComponent,
    CeilPipe,
    ResponseComponent
  ],
  imports: [
    NgbModule.forRoot(),
    BrowserModule,
    SlimLoadingBarModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgMultiSelectDropDownModule.forRoot(),
    RouterModule.forRoot(routes)
  ],
  providers: [
    EnfermedadesService,
    SintomasService,
    PreguntasService,
    AppLoadingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
