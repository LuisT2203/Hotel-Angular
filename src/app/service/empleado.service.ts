import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IEmpleado } from '../model/iEmpleado';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {
  URL ="http://localhost:8080/empleado"
  constructor(private http:HttpClient) { }

  getEmpleados (){
    return this.http.get<IEmpleado>(this.URL);
  }
  getEmpleado (Id_emp:any){
    return this.http.get<IEmpleado>(`${this.URL}/${Id_emp}`);
  }
  insertarEmpleado(emple:IEmpleado){
    return this.http.post<IEmpleado>(this.URL,emple)
    .pipe(map(emp=>emple));
  }
  actualizarEmpleado(emple:IEmpleado){
    return this.http.put<IEmpleado>(this.URL,emple)
    .pipe(map(emp=>emple));
  }
  eliminarEmpleado(Id_emp: number) {
    return this.http.delete(`${this.URL}/${Id_emp}`);
}
}
