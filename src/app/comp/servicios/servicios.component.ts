import { Component, OnInit } from '@angular/core';
import { ServicioService } from '../../service/servicio.service';
import { IServicio } from '../../model/iServicio';
import { Servicio } from '../../model/servicio';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmpleadoService } from '../../service/empleado.service';
import { IEmpleado } from '../../model/iEmpleado';
import { MensajeResponse } from '../../model/MensajeResponse';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-servicios',
  standalone: true,
  imports: [NgFor,FormsModule],
  templateUrl: './servicios.component.html',
  styleUrl: './servicios.component.css'
})
export class ServiciosComponent implements OnInit {
  constructor(private service:ServicioService, private empService:EmpleadoService,
    private toastr: ToastrService){}

  empleados : IEmpleado[]=[]
  servicios: IServicio[]=[]
  textoBoton ="Agregar";
  servicio = new Servicio();
  insUpd = true;


  ngOnInit(): void {
    this.getservicios();
    this.getEmpleados();
  }
  resetForm(){
    this.servicio = new Servicio();
    this.insUpd=true;
    this.textoBoton="Agregar";
  }
  getservicios(){
    this.service.getServicios().subscribe(
      (result:any)=>{this.servicios=result.object;

      },
      error => {
        console.error('Error al obtener los servicios', error);
        this.toastr.error(error.error, 'Error');
      });
  }
  getEmpleados(){
    this.empService.getEmpleados().subscribe(
      (data:any)=>this.empleados=data.object
    );
  }
  editar(ser: IServicio){
    this.textoBoton ="Actualizar";
    this.insUpd = false;
    this,this.service.getServicio(ser.id_servicio).subscribe(
      (data:any)=> this.servicio = data
    );
  }

  agregar(){
    if(this.insUpd){
      this.service.insertarServicio(this.servicio).subscribe(
          (resp: MensajeResponse)=>{
            this.toastr.success(resp.mensaje, 'Éxito');
            this.getservicios();
            this.insUpd=false;
          },
          (error) => {
            console.error('Error al agregar:', error);
            this.toastr.error(error.error, 'Error');
          }
      );

    }else{
      this.service.actualizarServicio(this.servicio).subscribe(
        (resp)=>{
          this.toastr.success(resp.mensaje, 'Éxito');
          this.getservicios();
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
 eliminar(ser: IServicio) {
  if (confirm("¿Estás seguro de eliminar este servicio?")) {
      this.service.eliminarServicio(ser.id_servicio).subscribe(
          (resp :MensajeResponse) => {
            this.toastr.success(resp.mensaje, 'Éxito');
              this.getservicios(); // Actualizar la lista después de eliminar
          },
          (error) => {
            console.error('Error al eliminar:', error);
            this.toastr.error(error.error, 'Error');
          }
      );
  }
}
}
