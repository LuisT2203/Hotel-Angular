import { Component, OnInit } from '@angular/core';
import { ReservaService } from '../../service/reserva.service';
import { IReserva } from '../../model/iReserva';
import { Reserva } from '../../model/Reserva';
import { HabitacionService } from '../../service/habitacion.service';
import { HuespedService } from '../../service/huesped.service';
import { EmpleadoService } from '../../service/empleado.service';
import { ServicioService } from '../../service/servicio.service';
import { Ihabitacion } from '../../model/iHabitacion';
import { IHuesped } from '../../model/iHuesped';
import { IEmpleado } from '../../model/iEmpleado';
import { IServicio } from '../../model/iServicio';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reservas',
  standalone: true,
  imports: [NgFor,FormsModule],
  templateUrl: './reservas.component.html',
  styleUrl: './reservas.component.css'
})
export class ReservasComponent implements OnInit {
  constructor(private service:ReservaService,private habiService:HabitacionService,
    private hueService:HuespedService, private empService:EmpleadoService,
    private serService:ServicioService
  ){}

  reservas: IReserva[]=[]
  habitaciones: Ihabitacion[]=[]
  huespedes: IHuesped[]=[]
  empleados : IEmpleado[]=[]
  servicios: IServicio[]=[]
  textoBoton ="Agregar";
  reserva = new Reserva();
  insUpd = true;


  ngOnInit(): void {
    this.getreservas();
    this.getHabitaciones();
    this.gethuespedes();
    this. getEmpleados();
    this.getservicios();
  }
  getreservas(){
    this.service.getReservas().subscribe(
      (result:any)=>this.reservas=result
    );
  }
  getHabitaciones(){
    this.habiService.getHabitaciones().subscribe(
      (result:any)=>this.habitaciones=result
    );
  }
  gethuespedes(){
    this.hueService.getHuespedes().subscribe(
      (result:any)=>this.huespedes=result
    );
  }
  getEmpleados(){
    this.empService.getEmpleados().subscribe(
      (data:any)=>this.empleados=data
    );
  }
  getservicios(){
    this.serService.getServicios().subscribe(
      (result:any)=>this.servicios=result
    );
  }
  editar(res: IReserva){
    this.textoBoton ="Actualizar";
    this.service.getReserva(res.nro_reserva).subscribe(
      (data:any)=> {
        this.reserva = data;

        // Buscamos el huésped correspondiente y lo asignamos si es válido
        const huespedEncontrado = this.huespedes.find(h => h.id_huesped === res.huesped.id_huesped);
        if (huespedEncontrado) {
          this.reserva.huesped = huespedEncontrado;
        } else {
          console.error('Huésped no encontrado:', res.huesped);
        }

        // Buscamos la habitación correspondiente y la asignamos si es válida
        const habitacionEncontrada = this.habitaciones.find(h => h.nro_habi === res.habitacion.nro_habi);
        if (habitacionEncontrada) {
          this.reserva.habitacion = habitacionEncontrada;
        } else {
          console.error('Habitación no encontrada:', res.habitacion);
        }

        // Buscamos al empleado correspondiente y lo asignamos si es válido
        const empleadoEncontrado = this.empleados.find(e => e.id_emp === res.empleado.id_emp);
        if (empleadoEncontrado) {
          this.reserva.empleado = empleadoEncontrado;
        } else {
          console.error('Empleado no encontrado:', res.empleado);
        }

        // Buscamos el servicio correspondiente y lo asignamos si es válido
        const servicioEncontrado = this.servicios.find(s => s.id_servicio === res.servicio.id_servicio);
        if (servicioEncontrado) {
          this.reserva.servicio = servicioEncontrado;
        } else {
          console.error('Servicio no encontrado:', res.servicio);
        }
      }
    );
  }
  agregar(){
    if(this.insUpd){
      this.service.insertarReserva(this.reserva).subscribe(
          (resp)=>{
            this.getreservas();
            this.insUpd=false;


          }
      );

    }else{
      this.service.actualizarReserva(this.reserva).subscribe(
        (resp)=>{
          this.getreservas();
          this.insUpd=true;


    }
  );
  }
  this.textoBoton ="Agregar";
 }
 eliminar(res: IReserva) {
  if (confirm("¿Estás seguro de eliminar esta reserva?")) {
      this.service.eliminarReserva(res.nro_reserva).subscribe(
          () => {
              this.getreservas(); // Actualizar la lista después de eliminar
          }
      );
  }
}
}
