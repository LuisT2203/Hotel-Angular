import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IHabitacion } from '../pages/model/iHabitacion';
import { map } from 'rxjs';
import { ResponseLista } from '../pages/model/ResponseLista';

@Injectable({
  providedIn: 'root'
})
export class HabitacionService {
  URL ="http://localhost:8080/habitaciones"
  constructor(private http:HttpClient) { }

  getHabitaciones (){
    return this.http.get<ResponseLista>(this.URL+"/lista");
  }

  insertarHabitacion(hab:IHabitacion){
    return this.http.post<ResponseLista>(this.URL+"/insertar", hab)
    .pipe(map(emp=>hab));
  }

  //Actualizar Habitacion
  actualizarHabitacion(hab:IHabitacion){
    return this.http.put<IHabitacion>(`${this.URL}/actualizar/${hab.nro_habi}`,hab)
    .pipe(map(emp=>hab));
  }

  //Eliminar Habitacion
  eliminarHabitacion(nro_habi: number) {
    return this.http.delete<ResponseLista>(`${this.URL}/eliminar/${nro_habi}`)
    .pipe(map(response => response));
}
}
