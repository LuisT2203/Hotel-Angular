import { Component, OnInit } from '@angular/core';
import { HabitacionService } from '../../service/habitacion.service';
import { Ihabitacion } from '../../model/iHabitacion';
import { CommonModule, NgClass, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Habitacion } from '../../model/habitacion';
import { AuthService } from '../../service/auth.service';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MensajeResponse } from '../../model/MensajeResponse';


@Component({
  selector: 'app-habitaciones',
  standalone: true,
  imports: [NgFor,FormsModule,NgClass,CommonModule,RouterLink],
  templateUrl: './habitaciones.component.html',
  styleUrl: './habitaciones.component.css'
})
export class HabitacionesComponent implements OnInit {

  constructor(private service:HabitacionService,public authService: AuthService,
    private toastr: ToastrService
  ){}

  habitaciones: Ihabitacion[]=[]
  textoBoton ="Agregar";
  habitacion = new Habitacion();
  insUpd = true;


  ngOnInit(): void {
    this.getHabitaciones();
  }
  resetForm(){
    this.habitacion = new Habitacion();
    this.insUpd=true;
    this.textoBoton="Agregar";
  }
  getHabitaciones(){
    this.service.getHabitaciones().subscribe(
      (result:any)=>{
        this.habitaciones=result.object

      },
      error => {
        console.error('Error al obtener las habitaciones', error);
        this.toastr.error(error.error, 'Error');
      }
    );
  }
  editar(hab: Ihabitacion){
    this.textoBoton ="Actualizar";
    this.insUpd = false;
    this,this.service.getHabitacion(hab.nro_habi).subscribe(
      (data:any)=> this.habitacion = data
    );
  }

  agregar(){
    if(this.insUpd){
      this.service.insertarHabitacion(this.habitacion).subscribe(
          (resp: MensajeResponse)=>{
            this.toastr.success(resp.mensaje, 'Éxito');
            this.getHabitaciones();
            this.insUpd=false;
          },
          (error) => {
            console.error('Error al agregar:', error);
            this.toastr.error(error.error, 'Error');
          }
      );

    }else{
      this.service.actualizarHabitacion(this.habitacion).subscribe(
        (resp: MensajeResponse)=>{
          this.toastr.success(resp.mensaje, 'Éxito');
          this.getHabitaciones();
          this.insUpd=true;
    },
    (error) => {
      console.error('Error al actualizar:', error);
      this.toastr.error(error.error, 'Error');
    }
  );
  }
  this.textoBoton ="Agregar";
 }
 eliminar(hab: Ihabitacion) {
  if (confirm("¿Estás seguro de eliminar esta habitación?")) {
      this.service.eliminarHabitacion(hab.nro_habi).subscribe(
          (resp :MensajeResponse) => {
            this.toastr.success(resp.mensaje, 'Éxito');
              this.getHabitaciones(); // Actualizar la lista después de eliminar
          },
          (error) => {
            console.error('Error al Eliminar:', error);
            this.toastr.error(error.error, 'Error');
          }
      );
  }
}
}
