import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class EnfermedadesService {

  uri = 'http://localhost:4000/enfermedades';

  constructor(private http: HttpClient) { }

  add(nombre, descripcion, tratamiento): Observable<any> {
    const obj = {
      nombre: nombre,
      descripcion: descripcion,
      tratamiento: tratamiento,
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
          nombre: filter.nombre || '',
          descripcion: filter.descripcion || '',
          tratamiento: filter.tratamiento || ''
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

  update(enfermedad) {
    return this
      .http
      .post(`${this.uri}/update/${enfermedad._id}`, enfermedad);
  }
}
