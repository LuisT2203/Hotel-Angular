import { Component, OnInit } from '@angular/core';
import { IReserva } from '../../pages/model/iReserva';
import { IHabitacion } from '../../pages/model/iHabitacion';
import { DetalleReserva } from '../../pages/model/detallereserva';
import { DetalleReservaService } from '../../service/detallereserva.service';
import { ReservaService } from '../../service/reserva.service';
import { HabitacionService } from '../../service/habitacion.service';
import { IDetalleReserva } from '../../pages/model/iDetalleReserva';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ResponseLista } from '../../pages/model/ResponseLista';
import { error } from 'console';

@Component({
  selector: 'app-detallereserva',
  standalone: true,
  imports: [NgFor,FormsModule],
  templateUrl: './detallereserva.component.html',
  styleUrl: './detallereserva.component.css'
})

export class DetallereservaComponent  implements OnInit{
  constructor(private serviceR:ReservaService,private habiService:HabitacionService,
    private detaService:DetalleReservaService,
  ){}

  reservas: IReserva[]=[]
  habitaciones: IHabitacion[]=[]
  detallereservas: IDetalleReserva[]=[]
  textoBoton ="Agregar";
  detallereserva = new DetalleReserva();
  insUpd = true;

  ngOnInit(): void {
    this.getDetalleReserva();
    this.getReservas();
    this.getHabitaciones();

  }
  resetForm(){
    this.detallereserva = new DetalleReserva();
    this.insUpd=true;
    this.textoBoton="Agregar";
  }

  getReservas(){
    this.serviceR.getReservas().subscribe(
      (result: ResponseLista) => {
        this.reservas = result.object; //Asigna laa lista de Detalle de Reservas a la propiedad
      },
      (error: any) => {
        console.error("Error con la reserva:", error);
      }
    );
  }


  getHabitaciones(){
    this.habiService.getHabitaciones().subscribe(
      (result: ResponseLista) => {
        this.habitaciones = result.object; // Asigna la lista de Habitaciones a la propiedad habitaciones
      },
      (error: any) =>{
        console.error("Error al obtener las habitaciones: ", error)
      }
    );
  }

  getDetalleReserva(){
    this.detaService.getDetalleReservas().subscribe(
      (result: ResponseLista) => {
        this.detallereservas = result.object;
      },
      (error: any) =>{
        console.error("Error al obtener Detalle rerva:", error);
      }
    );
  }
  editar(dere: IDetalleReserva){
    this.textoBoton ="Actualizar";
    this.insUpd = false;
    this.detallereserva = {
      id_detareser: dere.id_detareser,
      fecha_ingreso: dere.fecha_ingreso,
      hora_entrada: dere.hora_entrada,
      hora_salida: dere.hora_salida,
      fecha_salida: dere.fecha_salida,
      habitacion: dere.habitacion,
      reserva: dere.reserva
    };
  }

  agregar(){
    if(this.insUpd){
      this.detaService.insertarDetalleReserva(this.detallereserva).subscribe(
          ()=>{
            this.getDetalleReserva();
            /*this.insUpd=false;*/
            this.resetForm();
          },
          (error) => {
            console.error("Error al agregar el Detalle Reserva:", error); //En caso de error
          }
      );
    }else{
      this.detaService.actualizarDetalleReserva(this.detallereserva).subscribe(
        (response)=>{
          console.log("Detalle Reserva actualizado:", response);
          this.getDetalleReserva();
          /* this.insUpd=true; */
          this.resetForm(); // Resetea el formulario
      },
      (error) => {
        console.error("Error al actualizar servicio:", error); //En caso de error
      }
    );
  }
 }

 
 eliminar(dere: IDetalleReserva) {
  if (confirm("¿Estás seguro de eliminar esta reserva?")) {
      this.detaService.eliminarDetalleReserva(dere.id_detareser).subscribe(
          () => {
              this.getDetalleReserva(); // Actualizar la lista después de eliminar
          }
      );
  }
}
}
