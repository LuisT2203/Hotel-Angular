import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseLista } from '../pages/model/ResponseLista';
import { map } from 'rxjs';
import { IServicio } from '../pages/model/iServicio';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {

  URL ="http://localhost:8080/servicios"
  constructor(private http:HttpClient) { }

  // Obtener el listado de servicios
  getServicios(){
    return this.http.get<ResponseLista>(this.URL+"/lista");
  }

  // Agregar nuevo servicio
  insertarServicio(ser:IServicio){
    return this.http.post<ResponseLista>(this.URL+"/insertar",ser)
    .pipe(map(emp=>ser));
  }

  //Actualizar el servicio
  actualizarServicio(ser: IServicio) {
    return this.http.put<ResponseLista>(`${this.URL}/actualizar/${ser.id_servicio}`, ser)
      .pipe(map(emp => emp));
  }

  //Eliminar servicio
  eliminarServicio(id_servicio: number) {
    return this.http.delete<ResponseLista>(`${this.URL}/eliminar/${id_servicio}`)
      .pipe(map(response => response));
  }
}
