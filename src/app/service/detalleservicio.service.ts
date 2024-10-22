import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map } from 'rxjs';
import { IDetalleServicio } from '../pages/model/iDetalleServicio';
import { ResponseLista } from '../pages/model/ResponseLista';

@Injectable({
  providedIn: 'root'
})
export class DetalleservicioService {

  URL ="http://localhost:8080/detalleservicio"
  constructor(private http:HttpClient) { }

  getDetalleServicios(){
    return this.http.get<ResponseLista>(this.URL+"/lista");
  }
  
  insertarDetalleServicio(dese:IDetalleServicio){
    return this.http.post<ResponseLista>(this.URL+"/insertar",dese)
    .pipe(map(emp=>dese));
  }
  actualizarDetalleServicio(dese:IDetalleServicio){
    return this.http.put<ResponseLista>(`${this.URL}/actualizar/${dese.id_detaserv}`,dese)
    .pipe(map(emp=>dese));
  }
  eliminarDetalleServicio(id_detaserv: number) {
    return this.http.delete<ResponseLista>(`${this.URL}/eliminar/${id_detaserv}`);
}
}
