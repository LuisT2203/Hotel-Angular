import { Component, OnInit } from '@angular/core';
import { IReserva } from '../../model/iReserva';
import { Ihabitacion } from '../../model/iHabitacion';

import { DetalleReserva } from '../../model/detallereserva';
import { DetallereservaService } from '../../service/detallereserva.service';
import { ReservaService } from '../../service/reserva.service';
import { HabitacionService } from '../../service/habitacion.service';
import { IDetalleReserva } from '../../model/iDetalleReserva';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MensajeResponse } from '../../model/MensajeResponse';

@Component({
  selector: 'app-detallereserva',
  standalone: true,
  imports: [NgFor,FormsModule],
  templateUrl: './detallereserva.component.html',
  styleUrl: './detallereserva.component.css'
})
export class DetallereservaComponent  implements OnInit{
  constructor(private serviceR:ReservaService,private habiService:HabitacionService,
    private detaService:DetallereservaService,private toastr: ToastrService
  ){}
  reservas: IReserva[]=[]
  habitaciones: Ihabitacion[]=[]
  detallereservas: IDetalleReserva[]=[]
  textoBoton ="Agregar";
  detallereserva = new DetalleReserva();
  insUpd = true;

  ngOnInit(): void {
    this.getdetallereserva();
    this.getreservas();
    this.getHabitaciones();

  }
  resetForm(){
    this.detallereserva = new DetalleReserva();
    this.insUpd=true;
    this.textoBoton="Agregar";
  }
  getreservas(){
    this.serviceR.getReservas().subscribe(
      (result:any)=>this.reservas=result.object
    );
  }
  getHabitaciones(){
    this.habiService.getHabitaciones().subscribe(
      (result:any)=>this.habitaciones=result.object
    );
  }
  getdetallereserva(){
    this.detaService.getDetallereservas().subscribe(
      (result:any)=>{
        this.detallereservas=result.object

      },
      error => {
        console.error('Error al obtener los Detalles Reserva', error);
        this.toastr.error(error.error, 'Error');
      }
    );
  }
  editar(dere: IDetalleReserva){
    this.textoBoton ="Actualizar";
    this.insUpd = false;
    this,this.detaService.getDetallereserva(dere.id_detareser).subscribe(
      (data:any)=> {
        this.detallereserva = data;
        const reservaEncontrada = this.reservas.find(r => r.nro_reserva === dere.reserva.nro_reserva);
      if (reservaEncontrada) {
        this.detallereserva.reserva = reservaEncontrada;
      } else {
        console.error('Reserva no encontrada:', dere.reserva);
      }
      // Buscamos la habitación correspondiente y la asignamos si es válida
      const habitacionEncontrada = this.habitaciones.find(h => h.nro_habi === dere.habitacion.nro_habi);
      if (habitacionEncontrada) {
        this.detallereserva.habitacion = habitacionEncontrada;
      } else {
        console.error('Habitación no encontrada:', dere.habitacion);
      }
      }
    );
  }

  agregar(){
    if(this.insUpd){
      this.detaService.insertarDetallereserva(this.detallereserva).subscribe(
          (resp: MensajeResponse)=>{
            this.toastr.success(resp.mensaje, 'Éxito');
            this.getdetallereserva();
            this.insUpd=false;
          },
          (error) => {
            console.error('Error al agregar:', error);
            this.toastr.error(error.error, 'Error');
          }
      );

    }else{
      this.detaService.actualizarDetallereserva(this.detallereserva).subscribe(
        (resp: MensajeResponse)=>{
          this.toastr.success(resp.mensaje, 'Éxito');
          this.getdetallereserva();
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
 eliminar(dere: IDetalleReserva) {
  if (confirm("¿Estás seguro de eliminar esta reserva?")) {
      this.detaService.eliminarDetallereserva(dere.id_detareser).subscribe(
          (resp :MensajeResponse) => {
            this.toastr.success(resp.mensaje, 'Éxito');
              this.getdetallereserva(); // Actualizar la lista después de eliminar
          },
          (error) => {
            console.error('Error al eliminar:', error);
            this.toastr.error(error.error, 'Error');
          }
      );
  }
}
}
