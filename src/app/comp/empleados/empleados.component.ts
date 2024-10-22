import { Component, OnInit } from '@angular/core';
import { EmpleadoService } from '../../service/empleado.service';
import { IEmpleado } from '../../pages/model/iEmpleado';
import { Empleado } from '../../pages/model/empleado';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ResponseLista } from '../../pages/model/ResponseLista';

@Component({
  selector: 'app-empleados',
  standalone: true,
  imports: [NgFor,FormsModule],
  templateUrl: './empleados.component.html',
  styleUrl: './empleados.component.css'
})

export class EmpleadosComponent implements OnInit{
  constructor(private service:EmpleadoService){}
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
      (result: ResponseLista) => {
        this.empleados = result.object; //Asigna la lista de empleados a la propiedad empleados
      },
      (error: any) => {
        console.error("Error al obtener Empleados:", error);
      }
    );
  }

  editar(emp: IEmpleado){
    this.textoBoton ="Actualizar"; // Cambiar el texto del botón a "Actualizar"
    this.insUpd = false; // Indica que el formulario esta en modo para actualizar
    this.empleado = { //Asignar los valores del servicio para editar el objeto "Servicio"
      id_emp: emp.id_emp,
      nombre_emp: emp.nombre_emp,
      apellido_emp: emp.apellido_emp,
      sexo_emp: emp.sexo_emp,
      cargo_emp: emp.cargo_emp
    };
  }

  agregar(){
    if(this.insUpd){
      // Lógica para agregar un nuevo servicio
      this.service.insertarEmpleado(this.empleado).subscribe(
          ()=>{
            this.getEmpleados(); // Actualiza la lista después de agregar
            this.resetForm(); // Resetea el formulario
          },
          (error) => { 
            console.error("Error al agregar Empleado:", error); //En caso de error
          }
      );
    } else{
      // Lógica para actualizar el servicio existente
      this.service.actualizarEmpleado(this.empleado).subscribe(
        (response)=>{
          console.log("Empleado actualizado:", response);
          this.getEmpleados(); // Actualiza la lista después de actualizar
          this.resetForm(); // Resetea el formulario
        },
        (error) => {
          console.error("Error al actualizar Empleado:", error); //En caso de error
        }
  );
  }
 }
 eliminar(emp: IEmpleado) {
  if (confirm("¿Estás seguro de eliminar este empleado?")) {
      this.service.eliminarEmpleado(emp.id_emp).subscribe(
          () => {
              this.getEmpleados(); // Actualizar la lista después de eliminar
          }
      );
  }
}
}
