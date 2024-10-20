import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ihabitacion } from '../model/iHabitacion';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HabitacionService {
  URL ="http://localhost:8080/habitacion"
  constructor(private http:HttpClient) { }

  getHabitaciones (){
    return this.http.get<Ihabitacion[]>(this.URL);
  }
  getHabitacion (nro_habitacion:any){
    return this.http.get<Ihabitacion>(`${this.URL}/${nro_habitacion}`);
  }
  insertarHabitacion(hab:Ihabitacion){
    return this.http.post<Ihabitacion>(this.URL,hab)
    .pipe(map(emp=>hab));
  }
  actualizarHabitacion(hab:Ihabitacion){
    return this.http.put<Ihabitacion>(this.URL,hab)
    .pipe(map(emp=>hab));
  }
  eliminarHabitacion(nro_habi: number) {
    return this.http.delete(`${this.URL}/${nro_habi}`);
}
}
