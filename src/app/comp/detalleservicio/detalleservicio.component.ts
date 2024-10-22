import { Component, OnInit } from '@angular/core';
import { DetalleservicioService } from '../../service/detalleservicio.service';
import { IDetalleServicio } from '../../pages/model/iDetalleServicio';
import { DetalleServicio } from '../../pages/model/detalleservicio';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ServicioService } from '../../service/servicio.service';
import { ReservaService } from '../../service/reserva.service';
import { EmpleadoService } from '../../service/empleado.service';
import { IReserva } from '../../pages/model/iReserva';
import { IEmpleado } from '../../pages/model/iEmpleado';
import { IServicio } from '../../pages/model/iServicio';
import { ResponseLista } from '../../pages/model/ResponseLista';

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
    this.getDetalleServicios();
    this.getReservas();
    this.getEmpleados();
    this.getServicios();
  }
  resetForm(){
    this.detalleservicio = new DetalleServicio();
    this.insUpd=true;
    this.textoBoton="Agregar";
  }

  getDetalleServicios(){
    this.service.getDetalleServicios().subscribe(
      (result: ResponseLista) => {
        this.detalleservicios= result.object;
      },
      (error: any) => {
        console.error("Error al obtener Detalle Servicio", error);
      }
    );
  }
  getReservas(){
    this.serviceR.getReservas().subscribe(
      (result: ResponseLista) => {
        this.reservas = result.object
      },
      (error: any) => {
        console.error("Error al obtener las reservas", error);
      }
    );
  }
  getEmpleados(){
    this.serviceE.getEmpleados().subscribe(
      (result: ResponseLista) => {
        this.empleados = result.object
      },
      (error: any) => {
        console.error("Error al obtener empleados", error);
      }
    );
  }
  getServicios(){
    this.serviceSer.getServicios().subscribe(
      (result: ResponseLista) => {
        this.servicios = result.object
      },
      (error: any) => {
        console.error("Error al obtener Servicios", error);
      }
    );
  }
  editar(dese: IDetalleServicio){
    this.textoBoton ="Actualizar";
    this.insUpd = false;
    this.detalleservicio = {
      id_detaserv: dese.id_detaserv,
      estado_serv: dese.estado_serv,
      hora_serv: dese.hora_serv,
      empleado: dese.empleado,
      reserva: dese.reserva,
      servicio: dese.servicio
    }
  }

  agregar(){
    if(this.insUpd){
      this.service.insertarDetalleServicio(this.detalleservicio).subscribe(
          ()=>{
            this.getDetalleServicios();
            /* this.insUpd=false; */
            this.resetForm();
          },
          (error) => {
            console.error("Error al agregar el Detalle Servicio:", error); //En caso de error
          }
      );
    }else{
      this.service.actualizarDetalleServicio(this.detalleservicio).subscribe(
        (response)=>{
          console.log("Detalle Reserva actualizado:", response);
          this.getDetalleServicios();
          /* this.insUpd=false; */
          this.resetForm(); // Resetea el formulario
        },
        (error) => {
          console.error("Error al actualizar servicio:", error); //En caso de error
        }
  );
  }
 }
 eliminar(dese: IDetalleServicio) {
  if (confirm("¿Estás seguro de eliminar este detalleservicio?")) {
      this.service.eliminarDetalleServicio(dese.id_detaserv).subscribe(
          () => {
              this.getDetalleServicios(); // Actualizar la lista después de eliminar
          }
      );
  }
}

}
