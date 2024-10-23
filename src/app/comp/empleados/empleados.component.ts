import { Component, OnInit } from '@angular/core';
import { EmpleadoService } from '../../service/empleado.service';
import { IEmpleado } from '../../model/iEmpleado';
import { Empleado } from '../../model/empleado';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MensajeResponse } from '../../model/MensajeResponse';

@Component({
  selector: 'app-empleados',
  standalone: true,
  imports: [NgFor,FormsModule],
  templateUrl: './empleados.component.html',
  styleUrl: './empleados.component.css'
})
export class EmpleadosComponent implements OnInit{
  constructor(private service:EmpleadoService,private toastr: ToastrService){}
  empleados : IEmpleado[]=[]
  textoBoton ="Agregar";
  empleado = new Empleado();
  insUpd = true;


  ngOnInit(): void {
    this.getEmpleados();
  }
  resetForm(){
    this.empleado = new Empleado();
    this.insUpd=true;
    this.textoBoton="Agregar";
  }

  getEmpleados(){
    this.service.getEmpleados().subscribe(
      (data:any)=>{
        this.empleados=data.object

      },
      error => {
        console.error('Error al obtener los empleados', error);
        this.toastr.error(error.error, 'Error');
      }
    );
  }
  editar(emp: IEmpleado){
    this.textoBoton ="Actualizar";
    this.insUpd = false;
    this,this.service.getEmpleado(emp.id_emp).subscribe(
      (data:any)=> this.empleado = data
    );
  }

  agregar(){
    if(this.insUpd){
      this.service.insertarEmpleado(this.empleado).subscribe(
          (resp: MensajeResponse)=>{
            this.toastr.success(resp.mensaje, 'Éxito');
            this.getEmpleados();
            this.resetForm();
          },
          (error) => {
            console.error('Error al agregar:', error);
            this.toastr.error(error.error, 'Error');
          }
      );

    }else{
      this.service.actualizarEmpleado(this.empleado).subscribe(
        (resp: MensajeResponse)=>{
          this.toastr.success(resp.mensaje, 'Éxito');
          this.getEmpleados();
          this.resetForm();
    },
    (error) => {
      console.error('Error al actualizar:', error);
      this.toastr.error(error.error, 'Error');
    }
  );
  }
 }
 eliminar(emp: IEmpleado) {
  if (confirm("¿Estás seguro de eliminar este empleado?")) {
      this.service.eliminarEmpleado(emp.id_emp).subscribe(
          (resp :MensajeResponse) => {
            this.toastr.success(resp.mensaje, 'Éxito');
              this.getEmpleados(); // Actualizar la lista después de eliminar
          },
          (error) => {
            console.error('Error al Eliminar:', error);
            this.toastr.error(error.error, 'Error');
          }
      );
  }
}
}
