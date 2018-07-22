import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class PreguntasService {

  uri = 'http://localhost:4000/preguntas';

  constructor(private http: HttpClient) { }

  add(descripcion): Observable<any> {
    const obj = {
      descripcion: descripcion
    };
    return this.http.post(`${this.uri}/add`, obj);
  }

  get(filter) {
    return this
      .http
      .get(`${this.uri}/`, {
        params: {
          perPage: '' + filter.pagination.perPage,
          page: '' + filter.pagination.page,
          descripcion: filter.descripcion || ''
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

  update(pregunta) {
    return this
      .http
      .post(`${this.uri}/update/${pregunta._id}`, pregunta);
  }
}
