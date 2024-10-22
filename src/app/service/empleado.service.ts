import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IEmpleado } from '../pages/model/iEmpleado';
import { map } from 'rxjs';
import { ResponseLista } from '../pages/model/ResponseLista';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {
  URL ="http://localhost:8080/empleados"
  constructor(private http:HttpClient) { }

  getEmpleados (){
    return this.http.get<ResponseLista>(this.URL+"/lista");
  }

  // Agregar nuevo empleado
  insertarEmpleado(emple:IEmpleado){
    return this.http.post<ResponseLista>(this.URL+"/insertar",emple)
    .pipe(map(emp=>emple));
  }

  // Actualizar empleado
  actualizarEmpleado(emple:IEmpleado){
    return this.http.put<ResponseLista>(`${this.URL}/actualizar/${emple.id_emp}`,emple)
    .pipe(map(emp=>emple));
  }

  // Eliminar empleado
  eliminarEmpleado(Id_emp: number) {
    return this.http.delete<ResponseLista>(`${this.URL}/eliminar/${Id_emp}`);
}
}
