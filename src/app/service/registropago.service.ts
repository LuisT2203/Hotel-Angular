import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IRegistroPago } from '../model/iRegistroPago';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistropagoService {

  URL ="http://localhost:8080/pago"
  constructor(private http:HttpClient) { }

  getPagos (){
    return this.http.get<IRegistroPago>(this.URL);
  }
  getPago (Id_pago:any){
    return this.http.get<IRegistroPago>(`${this.URL}/${Id_pago}`);
  }
  insertarPago(pago:IRegistroPago){
    return this.http.post<IRegistroPago>(this.URL,pago)
    .pipe(map(emp=>pago));
  }
  actualizarPago(pago:IRegistroPago){
    return this.http.put<IRegistroPago>(this.URL,pago)
    .pipe(map(emp=>pago));
  }
  eliminarPago(Id_pago: number) {
    return this.http.delete(`${this.URL}/${Id_pago}`);
}
}
