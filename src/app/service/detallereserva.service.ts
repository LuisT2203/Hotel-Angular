import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map } from 'rxjs';
import { IDetalleReserva } from '../model/iDetalleReserva';

@Injectable({
  providedIn: 'root'
})
export class DetallereservaService {

  URL ="http://localhost:8080/detallereserva"
  constructor(private http:HttpClient) { }

  getDetallereservas (){
    return this.http.get<IDetalleReserva>(this.URL);
  }
  getDetallereserva (id_detareser:any){
    return this.http.get<IDetalleReserva>(`${this.URL}/${id_detareser}`);
  }
  insertarDetallereserva(dere:IDetalleReserva){
    return this.http.post<IDetalleReserva>(this.URL,dere)
    .pipe(map(emp=>dere));
  }
  actualizarDetallereserva(dere:IDetalleReserva){
    return this.http.put<IDetalleReserva>(this.URL,dere)
    .pipe(map(emp=>dere));
  }
  eliminarDetallereserva(id_detareser: number) {
    return this.http.delete(`${this.URL}/${id_detareser}`);
}
}
