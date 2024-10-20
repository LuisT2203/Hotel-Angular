import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { IReserva } from '../model/iReserva';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {

  URL ="http://localhost:8080/reserva"
  constructor(private http:HttpClient) { }

  getReservas (){
    return this.http.get<IReserva[]>(this.URL);
  }
  getReserva (nro_reserva:any){
    return this.http.get<IReserva>(`${this.URL}/${nro_reserva}`);
  }
  insertarReserva(res:IReserva){
    return this.http.post<IReserva>(this.URL,res)
    .pipe(map(emp=>res));
  }
  actualizarReserva(res:IReserva){
    return this.http.put<IReserva>(this.URL,res)
    .pipe(map(emp=>res));
  }
  eliminarReserva(nro_reserva: number) {
    return this.http.delete(`${this.URL}/${nro_reserva}`);
}
}
