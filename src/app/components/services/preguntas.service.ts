import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PreguntasService {

  uri = 'http://localhost:4000/preguntas';

  constructor(private http: HttpClient) { }

  add(unit_name, unit_price) {
    const obj = {
      unit_name: unit_name,
      unit_price: unit_price
    };
    this.http.post(`${this.uri}/add`, obj)
      .subscribe(res => console.log('Done'));
  }

  getAdUnits() {
    return this
      .http
      .get(`${this.uri}/`);
  }
}
