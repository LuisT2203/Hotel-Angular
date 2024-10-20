import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IServicio } from '../model/iServicio';
import { map } from 'rxjs';
import { MensajeResponse } from '../model/MensajeResponse';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {

  URL ="http://localhost:8080/servicio"
  constructor(private http:HttpClient) { }

  getServicios (){
    return this.http.get<MensajeResponse>(this.URL+"/lista");
  }
  getServicio (id_servicio:any){
    return this.http.get<IServicio>(`${this.URL}/${id_servicio}`);
  }
  insertarServicio(ser:IServicio){
    return this.http.post<MensajeResponse>(this.URL+"/registrar",ser)
    .pipe(map(emp=>ser));
  }
  actualizarServicio(ser:IServicio){
    return this.http.put<MensajeResponse>(this.URL+"/actualizar",ser)
    .pipe(map(emp=>ser));
  }
  eliminarServicio(id_servicio: number) {
    return this.http.delete(`${this.URL}/${id_servicio}`);
}
}
