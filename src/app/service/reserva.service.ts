import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { IReserva } from '../model/iReserva';
import { MensajeResponse } from '../model/MensajeResponse';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {

  URL ="http://localhost:8080/reserva"
  constructor(private http:HttpClient) { }

  getReservas (){
    return this.http.get<MensajeResponse>(this.URL+"/lista");
  }
  getReserva (nro_reserva:any){
    return this.http.get<IReserva>(`${this.URL}/${nro_reserva}`);
  }
  insertarReserva(res: IReserva) {
    return this.http.post<MensajeResponse>(this.URL + "/registrar", res);
  }

  actualizarReserva(res: IReserva) {
    return this.http.put<MensajeResponse>(this.URL + "/actualizar", res);
  }
  eliminarReserva(nro_reserva: number) {
    return this.http.delete<MensajeResponse>(`${this.URL}/${nro_reserva}`);
}
}
