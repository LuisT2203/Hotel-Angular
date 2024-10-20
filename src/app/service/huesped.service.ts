import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { IHuesped } from '../model/iHuesped';
import { MensajeResponse } from '../model/MensajeResponse';

@Injectable({
  providedIn: 'root'
})
export class HuespedService {

  URL ="http://localhost:8080/huesped"
  constructor(private http:HttpClient) { }

  getHuespedes (){
    return this.http.get<MensajeResponse>(this.URL+"/lista");
  }
  getHuesped (id_huesped:any){
    return this.http.get<IHuesped>(`${this.URL}/${id_huesped}`);
  }
  insertarHuesped(hue:IHuesped){
    return this.http.post<MensajeResponse>(this.URL+"/registrar",hue)
    .pipe(map(emp=>hue));
  }
  actualizarHuesped(hue:IHuesped){
    return this.http.put<MensajeResponse>(this.URL+"/actualizar",hue)
    .pipe(map(emp=>hue));
  }
  eliminarHuesped(id_huesped: number) {
    return this.http.delete(`${this.URL}/${id_huesped}`);
}
}
