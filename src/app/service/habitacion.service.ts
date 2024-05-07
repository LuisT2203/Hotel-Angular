import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ihabitacion } from '../model/iHabitacion';

@Injectable({
  providedIn: 'root'
})
export class HabitacionService {
  URL ="http://localhost:8080/habitacion"
  constructor(private http:HttpClient) { }

  getHabitaciones (){
    return this.http.get<Ihabitacion>(this.URL);
  }
}
