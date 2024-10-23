import { Component, OnInit } from '@angular/core';
import { DetalleservicioService } from '../../service/detalleservicio.service';
import { IDetalleServicio } from '../../model/iDetalleServicio';
import { DetalleServicio } from '../../model/detalleservicio';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ServicioService } from '../../service/servicio.service';
import { ReservaService } from '../../service/reserva.service';
import { EmpleadoService } from '../../service/empleado.service';
import { IReserva } from '../../model/iReserva';
import { IEmpleado } from '../../model/iEmpleado';
import { IServicio } from '../../model/iServicio';
import { ToastrService } from 'ngx-toastr';
import { MensajeResponse } from '../../model/MensajeResponse';

@Component({
  selector: 'app-detalleservicio',
  standalone: true,
  imports: [NgFor,FormsModule],
  templateUrl: './detalleservicio.component.html',
  styleUrl: './detalleservicio.component.css'
})
export class DetalleservicioComponent implements OnInit {
  constructor(private service:DetalleservicioService, private serviceSer:ServicioService,
    private serviceR: ReservaService,private serviceE:EmpleadoService,private toastr: ToastrService
  ){}
  detalleservicios : IDetalleServicio[]=[]
  reservas: IReserva[]=[]
  empleados : IEmpleado[]=[]
  servicios: IServicio[]=[]
  textoBoton ="Agregar";
  detalleservicio = new DetalleServicio();
  insUpd = true;


  ngOnInit(): void {
    this.getdetalleservicios();
    this.getreservas();
    this.getEmpleados();
    this.getservicios();
  }
  resetForm(){
    this.detalleservicio = new DetalleServicio();
    this.insUpd=true;
    this.textoBoton="Agregar";
  }

  getdetalleservicios(){
    this.service.getDetalleServicios().subscribe(
      (data:any)=>{
        this.detalleservicios=data.object

      },
      error => {
        console.error('Error al obtener los detalle servicio', error);
        this.toastr.error(error.error, 'Error');
      }
    );
  }
  getreservas(){
    this.serviceR.getReservas().subscribe(
      (result:any)=>this.reservas=result.object
    );
  }
  getEmpleados(){
    this.serviceE.getEmpleados().subscribe(
      (data:any)=>this.empleados=data.object
    );
  }
  getservicios(){
    this.serviceSer.getServicios().subscribe(
      (result:any)=>this.servicios=result.object
    );
  }
  editar(dese: IDetalleServicio){
    this.textoBoton ="Actualizar";
    this.insUpd = false;
    this.service.getDetalleServicio(dese.id_detaserv).subscribe(
      (data:any)=> {
        this.detalleservicio = data;

        // Buscamos la reserva correspondiente y la asignamos si es válida
        const reservaEncontrada = this.reservas.find(r => r.nro_reserva === dese.reserva.nro_reserva);
        if (reservaEncontrada) {
          this.detalleservicio.reserva = reservaEncontrada;
        } else {
          console.error('Reserva no encontrada:', dese.reserva);
        }

        // Buscamos el servicio correspondiente y lo asignamos si es válido
        const servicioEncontrado = this.servicios.find(s => s.id_servicio === dese.servicio.id_servicio);
        if (servicioEncontrado) {
          this.detalleservicio.servicio = servicioEncontrado;
        } else {
          console.error('Servicio no encontrado:', dese.servicio);
        }

        // Buscamos al empleado correspondiente y lo asignamos si es válido
        const empleadoEncontrado = this.empleados.find(e => e.id_emp === dese.empleado.id_emp);
        if (empleadoEncontrado) {
          this.detalleservicio.empleado = empleadoEncontrado;
        } else {
          console.error('Empleado no encontrado:', dese.empleado);
        }
      }
    );
  }

  agregar(){
    if(this.insUpd){
      this.service.insertarDetalleServicio(this.detalleservicio).subscribe(
          (resp: MensajeResponse)=>{
            this.toastr.success(resp.mensaje, 'Éxito');
            this.getdetalleservicios();
            this.insUpd=false;
          },
          (error) => {
            console.error('Error al agregar:', error);
            this.toastr.error(error.error, 'Error');
          }
      );

    }else{
      this.service.actualizarDetalleServicio(this.detalleservicio).subscribe(
        (resp: MensajeResponse)=>{
          this.toastr.success(resp.mensaje, 'Éxito');
          this.getdetalleservicios();
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
 eliminar(dese: IDetalleServicio) {
  if (confirm("¿Estás seguro de eliminar este detalleservicio?")) {
      this.service.eliminarDetalleServicio(dese.id_detaserv).subscribe(
          (resp :MensajeResponse) => {
            this.toastr.success(resp.mensaje, 'Éxito');
              this.getdetalleservicios(); // Actualizar la lista después de eliminar
          },
          (error) => {
            console.error('Error al eliminar:', error);
            this.toastr.error(error.error, 'Error');
          }
      );
  }
}

}
