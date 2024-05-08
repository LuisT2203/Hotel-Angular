import { Component, OnInit } from '@angular/core';
import { HabitacionService } from '../../service/habitacion.service';
import { Ihabitacion } from '../../model/iHabitacion';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Habitacion } from '../../model/habitacion';


@Component({
  selector: 'app-habitaciones',
  standalone: true,
  imports: [NgFor,FormsModule],
  templateUrl: './habitaciones.component.html',
  styleUrl: './habitaciones.component.css'
})
export class HabitacionesComponent implements OnInit {

  constructor(private service:HabitacionService){}

  habitaciones: Ihabitacion[]=[]
  textoBoton ="Agregar";
  habitacion = new Habitacion();
  insUpd = true;


  ngOnInit(): void {
    this.getHabitaciones();
  }
  getHabitaciones(){
    this.service.getHabitaciones().subscribe(
      (result:any)=>this.habitaciones=result
    );
  }
  editar(hab: Ihabitacion){
    this.textoBoton ="Actualizar";
    this,this.service.getHabitacion(hab.nro_habi).subscribe(
      (data:any)=> this.habitacion = data
    );
  }

  agregar(){
    if(this.insUpd){
      this.service.insertarHabitacion(this.habitacion).subscribe(
          (resp)=>{
            this.getHabitaciones();
            this.insUpd=false;


          }
      );

    }else{
      this.service.actualizarHabitacion(this.habitacion).subscribe(
        (resp)=>{
          this.getHabitaciones();
          this.insUpd=true;


    }
  );
  }
  this.textoBoton ="Agregar";
 }
 eliminar(hab: Ihabitacion) {
  if (confirm("¿Estás seguro de eliminar esta habitación?")) {
      this.service.eliminarHabitacion(hab.nro_habi).subscribe(
          () => {
              this.getHabitaciones(); // Actualizar la lista después de eliminar
          }
      );
  }
}
}
