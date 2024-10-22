import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map } from 'rxjs';
import { IDetalleReserva } from '../model/iDetalleReserva';
import { MensajeResponse } from '../model/MensajeResponse';

@Injectable({
  providedIn: 'root'
})
export class DetallereservaService {

  URL ="http://localhost:8080/detallereserva"
  constructor(private http:HttpClient) { }

  getDetallereservas (){
    return this.http.get<MensajeResponse>(this.URL+"/lista");
  }
  getDetallereserva (id_detareser:any){
    return this.http.get<IDetalleReserva>(`${this.URL}/${id_detareser}`);
  }
  insertarDetallereserva(dere:IDetalleReserva){
    return this.http.post<MensajeResponse>(this.URL+"/insertar",dere)
    .pipe(map(emp=>dere));
  }
  actualizarDetallereserva(dere:IDetalleReserva){
    return this.http.put<MensajeResponse>(this.URL+"/actualizar",dere)
    .pipe(map(emp=>dere));
  }
  eliminarDetallereserva(id_detareser: number) {
    return this.http.delete(`${this.URL}/${id_detareser}`);
}
}
