import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { IDetalleReserva } from '../pages/model/iDetalleReserva';
import { ResponseLista } from '../pages/model/ResponseLista';

@Injectable({
  providedIn: 'root'
})
export class DetalleReservaService {

  URL ="http://localhost:8080/detallereserva"
  constructor(private http:HttpClient) { }

  getDetalleReservas(){
    return this.http.get<ResponseLista>(this.URL+"/lista");
  }

  insertarDetalleReserva(dere:IDetalleReserva){ 
    return this.http.post<ResponseLista>(this.URL+"/insertar",dere)
    .pipe(map(emp=>dere));
  }


  actualizarDetalleReserva(dere:IDetalleReserva){
    return this.http.put<ResponseLista>(`${this.URL}/actualizar/${dere.id_detareser}`,dere)
    .pipe(map(emp=>dere));
  }

  eliminarDetalleReserva(id_detareser: number) {
    return this.http.delete<ResponseLista>(`${this.URL}/eliminar/${id_detareser}`)
    .pipe(map(response => response));
}
}
