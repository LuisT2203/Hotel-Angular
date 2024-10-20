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
import { AuthService } from '../../service/auth.service';

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
    private serService:ServicioService, private authService: AuthService
  ){}

  reservas: IReserva[]=[]
  habitaciones: Ihabitacion[]=[]
  huespedes: IHuesped[]=[]
  empleados : IEmpleado[]=[]
  servicios: IServicio[]=[]
  textoBoton ="Agregar";
  reserva = new Reserva();
  insUpd = true;
  nuevoServicio?: IServicio;
  correoHuesped = this.authService.getUserEmail()
  tipoUsuario = this.authService.getUserType()


  ngOnInit(): void {
    this.getreservas();
    this.getHabitaciones();
    this.gethuespedes();
    this. getEmpleados();
    this.getservicios();
  }
  resetForm(){
    this.reserva = new Reserva();
    this.insUpd=true;
    this.textoBoton="Agregar";
  }
  getreservas(): void {
    this.service.getReservas().subscribe(
      (result: IReserva[]) => {
        this.reservas = result; // Asigna todas las reservas a la propiedad

        // Filtra las reservas si el usuario es un Huesped
        if (this.tipoUsuario === 'Huesped') {
          this.reservas = this.reservas.filter(reserva => reserva.huesped.correo === this.correoHuesped);
        }
      },
      error => {
        console.error('Error al obtener las reservas', error);
      }
    );
  }
  getHabitaciones(): void {
    this.habiService.getHabitaciones().subscribe(
      (result: Ihabitacion[]) => {
        // Asigna el resultado a la lista completa de habitaciones
        this.habitaciones = result;

        // Filtra solo las habitaciones que están "Disponibles"
        this.habitaciones = this.habitaciones.filter(habitacion => habitacion.estado === 'Disponible');
      },
      error => {
        console.error('Error al obtener las habitaciones', error);
        // Manejo de errores si es necesario
      }
    );
  }
  gethuespedes(): void {
    this.hueService.getHuespedes().subscribe(
      (result: IHuesped[]) => {
        // Asigna el resultado a la lista completa de huéspedes
        this.huespedes = result;

        // Filtra solo el huésped que corresponde al correo del usuario autenticado
        if (this.tipoUsuario === 'Huesped') {
          this.huespedes = this.huespedes.filter(huesped => huesped.correo === this.correoHuesped);
        }
      },
      error => {
        console.error('Error al obtener los huéspedes', error);
        // Manejo de errores si es necesario
      }
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
    this.insUpd = false;
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



        // Asignamos los servicios directamente si res.servicios es un array
        if (Array.isArray(res.servicios)) {
          this.reserva.servicios = [...res.servicios]; // Asignar una copia de la lista
        } else {
          console.error('Los servicios no son un array:', res.servicios);
      }
      }
    );
  }
  agregar() {
    if (this.insUpd) {
      // Si estamos insertando, solo agregamos la nueva reserva
      this.service.insertarReserva(this.reserva).subscribe(
        (resp) => {
          this.getreservas();
          this.insUpd = false;
        }
      );
    } else {
      // Si estamos actualizando, evitamos duplicados en la reserva
      this.service.actualizarReserva(this.reserva).subscribe(
        (resp) => {
          this.getreservas();
          this.insUpd = true;
        }
      );
    }
    this.textoBoton = "Agregar";
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
agregarNuevoServicio() {
  if (this.nuevoServicio) {
    const idNuevoServicio = this.nuevoServicio.id_servicio;

    if (idNuevoServicio) {
      const servicioExistente = this.reserva.servicios.find(servicio =>
        servicio.id_servicio === idNuevoServicio
      );

      if (!servicioExistente) {
        this.reserva.servicios.push(this.nuevoServicio);
        console.log('Servicio agregado:', this.nuevoServicio);
      } else {
        // Si el servicio ya existe, lo actualizamos
        this.actualizarServicioReserva(this.nuevoServicio);
        console.warn('Servicio actualizado:', this.nuevoServicio);
      }
    } else {
      console.error('El nuevo servicio no tiene un id_servicio válido.');
    }

    this.nuevoServicio = undefined; // Reiniciar nuevoServicio
  } else {
    console.error('El nuevo servicio es indefinido');
  }
}
removerServicio(servicio: IServicio) {
  this.reserva.servicios = this.reserva.servicios.filter(s => s.id_servicio !== servicio.id_servicio);
}
actualizarServicioReserva(servicio: IServicio) {
  const servicioExistente = this.reserva.servicios.find(s => s.id_servicio === servicio.id_servicio);

  if (servicioExistente) {
    // Si el servicio existe, se actualiza aquí
    // Puedes cambiar las propiedades del servicio como desees
    Object.assign(servicioExistente, servicio);
    console.log('Servicio actualizado:', servicioExistente);
  } else {
    console.warn('El servicio no se encontró en la reserva:', servicio);
  }
}
getServiciosUnicos(): IServicio[] {
  const idsServicios = new Set(this.reserva.servicios.map(s => s.id_servicio));
  return this.servicios.filter(servicio => !idsServicios.has(servicio.id_servicio));
}
}
