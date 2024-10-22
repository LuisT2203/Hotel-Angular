import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map } from 'rxjs';
import { IDetalleServicio } from '../model/iDetalleServicio';
import { MensajeResponse } from '../model/MensajeResponse';

@Injectable({
  providedIn: 'root'
})
export class DetalleservicioService {

  URL ="http://localhost:8080/detalleservicio"
  constructor(private http:HttpClient) { }

  getDetalleServicios (){
    return this.http.get<MensajeResponse>(this.URL+"/lista");
  }
  getDetalleServicio (id_detaserv:any){
    return this.http.get<IDetalleServicio>(`${this.URL}/${id_detaserv}`);
  }
  insertarDetalleServicio(dese:IDetalleServicio){
    return this.http.post<MensajeResponse>(this.URL+"/registrar",dese)
    .pipe(map(emp=>dese));
  }
  actualizarDetalleServicio(dese:IDetalleServicio){
    return this.http.put<MensajeResponse>(this.URL+"/actualizar",dese)
    .pipe(map(emp=>dese));
  }
  eliminarDetalleServicio(id_detaserv: number) {
    return this.http.delete(`${this.URL}/${id_detaserv}`);
}
}
