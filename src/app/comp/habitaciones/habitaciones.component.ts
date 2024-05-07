import { Component, OnInit } from '@angular/core';
import { HabitacionService } from '../../service/habitacion.service';
import { Ihabitacion } from '../../model/iHabitacion';


@Component({
  selector: 'app-habitaciones',
  standalone: true,
  imports: [],
  templateUrl: './habitaciones.component.html',
  styleUrl: './habitaciones.component.css'
})
export class HabitacionesComponent implements OnInit {

  constructor(private service:HabitacionService){}

  habitaciones: Ihabitacion[]=[]

  ngOnInit(): void {
    this.service.getHabitaciones().subscribe(
      (result:any)=>this.habitaciones=result
    );

  }
}
