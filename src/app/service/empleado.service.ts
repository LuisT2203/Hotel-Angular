import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IEmpleado } from '../model/iEmpleado';
import { map } from 'rxjs';
import { MensajeResponse } from '../model/MensajeResponse';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {
  URL ="http://localhost:8080/empleado"

  constructor(private http:HttpClient) { }

  getEmpleados (){
    return this.http.get<MensajeResponse>(this.URL+"/lista");
  }
  getEmpleado (id_emp:any){
    return this.http.get<IEmpleado>(`${this.URL}/${id_emp}`);
  }
  insertarEmpleado(emple:IEmpleado){
    return this.http.post<MensajeResponse>(this.URL+"/registrar",emple);
  }
  actualizarEmpleado(emple:IEmpleado){
    return this.http.put<MensajeResponse>(this.URL+"/actualizar",emple);
  }
  eliminarEmpleado(Id_emp: number) {
    return this.http.delete<MensajeResponse>(`${this.URL}/${Id_emp}`);
}
}
