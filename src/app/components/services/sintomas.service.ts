import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {SintomasResponse} from '../models/sintomas.response';
import {EnfermedadesResponse} from '../models/enfermedades.response';

@Injectable({
  providedIn: 'root'
})
export class SintomasService {

  uri = 'http://localhost:4000/sintomas';

  constructor(private http: HttpClient) { }

  add(nombre): Observable<any> {
    const obj = {
      nombre: nombre
    };
    return this.http.post(`${this.uri}/add`, obj);
  }

  get(filter): Observable<any> {
    return this
      .http
      .get(`${this.uri}/`, {
        params: {
          perPage: '' + filter.pagination.perPage,
          page: '' + filter.pagination.page,
          nombre: filter.nombre || ''
        }
      });
  }
  getAll(): Observable<any> {
    return this
      .http
      .get(`${this.uri}/`, {
        params: {
          perPage: '' + 50000,
          page: '' + 1,
          nombre: ''
        }
      });
  }

  delete(id) {
    return this
      .http
      .get(`${this.uri}/delete/${id}`);
  }

  edit(id) {
    return this
      .http
      .get(`${this.uri}/edit/${id}`);
  }

  update(sintoma) {
    return this
      .http
      .post(`${this.uri}/update/${sintoma._id}`, sintoma);
  }
}
