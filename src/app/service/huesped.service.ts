import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { IHuesped } from '../model/iHuesped';

@Injectable({
  providedIn: 'root'
})
export class HuespedService {

  URL ="http://localhost:8080/huesped"
  constructor(private http:HttpClient) { }

  getHuespedes (){
    return this.http.get<IHuesped[]>(this.URL);
  }
  getHuesped (id_huesped:any){
    return this.http.get<IHuesped>(`${this.URL}/${id_huesped}`);
  }
  insertarHuesped(hue:IHuesped){
    return this.http.post<IHuesped>(this.URL,hue)
    .pipe(map(emp=>hue));
  }
  actualizarHuesped(hue:IHuesped){
    return this.http.put<IHuesped>(this.URL,hue)
    .pipe(map(emp=>hue));
  }
  eliminarHuesped(id_huesped: number) {
    return this.http.delete(`${this.URL}/${id_huesped}`);
}
}
