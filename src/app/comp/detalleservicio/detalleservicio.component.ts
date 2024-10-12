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

@Component({
  selector: 'app-detalleservicio',
  standalone: true,
  imports: [NgFor,FormsModule],
  templateUrl: './detalleservicio.component.html',
  styleUrl: './detalleservicio.component.css'
})
export class DetalleservicioComponent implements OnInit {
  constructor(private service:DetalleservicioService, private serviceSer:ServicioService,
    private serviceR: ReservaService,private serviceE:EmpleadoService
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
      (data:any)=>this.detalleservicios=data
    );
  }
  getreservas(){
    this.serviceR.getReservas().subscribe(
      (result:any)=>this.reservas=result
    );
  }
  getEmpleados(){
    this.serviceE.getEmpleados().subscribe(
      (data:any)=>this.empleados=data
    );
  }
  getservicios(){
    this.serviceSer.getServicios().subscribe(
      (result:any)=>this.servicios=result
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
          (resp)=>{
            this.getdetalleservicios();
            this.insUpd=false;


          }
      );

    }else{
      this.service.actualizarDetalleServicio(this.detalleservicio).subscribe(
        (resp)=>{
          this.getdetalleservicios();
          this.insUpd=true;


    }
  );
  }
  this.textoBoton ="Agregar";
 }
 eliminar(dese: IDetalleServicio) {
  if (confirm("¿Estás seguro de eliminar este detalleservicio?")) {
      this.service.eliminarDetalleServicio(dese.id_detaserv).subscribe(
          () => {
              this.getdetalleservicios(); // Actualizar la lista después de eliminar
          }
      );
  }
}

}
