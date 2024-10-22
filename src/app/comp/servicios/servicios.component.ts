import { Component, OnInit } from '@angular/core';
import { ServicioService } from '../../service/servicio.service';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IServicio } from '../../pages/model/iServicio';
import { Servicio } from '../../pages/model/servicio';
import { ResponseLista } from '../../pages/model/ResponseLista';

@Component({
  selector: 'app-servicios',
  standalone: true,
  imports: [NgFor,FormsModule],
  templateUrl: './servicios.component.html',
  styleUrl: './servicios.component.css'
})

export class ServiciosComponent implements OnInit {
  constructor(private service:ServicioService){}

  servicios: IServicio[]=[]
  textoBoton ="Agregar";
  servicio = new Servicio();
  insUpd = true;


  ngOnInit(): void {
    this.getServicios();
  }
  resetForm(){
    this.servicio = new Servicio();
    this.insUpd=true;
    this.textoBoton="Agregar";
  }
  
  getServicios() {
    this.service.getServicios().subscribe(
      (result: ResponseLista) => {
        this.servicios = result.object; //Asigna la lista de servicios a la propiedad servicios
      },
      (error: any) => {
        console.error("Error al obtener servicios:", error);
      }
    );
  }

  editar(ser: IServicio) {
    this.textoBoton = "Actualizar"; // Cambiar el texto del botón a "Actualizar"
    this.insUpd = false; // Indica que el formulario esta en modo para actualizar
    this.servicio = {  //Asignar los valores del servicio para editar el objeto "Servicio"
      id_servicio: ser.id_servicio,
      nombre: ser.nombre,
      precio: ser.precio, 
      tipo: ser.tipo
    }; 
  }

  agregar() {
    if (this.insUpd) {
      // Lógica para agregar un nuevo servicio
      this.service.insertarServicio(this.servicio).subscribe(
        () => {
          this.getServicios(); // Actualiza la lista después de agregar
          this.resetForm(); // Resetea el formulario
        },
        (error) => { 
          console.error("Error al agregar servicio:", error); //En caso de error
        }
      );
    } else {
      // Lógica para actualizar el servicio existente
      this.service.actualizarServicio(this.servicio).subscribe(
        (response) => {
          console.log("Servicio actualizado:", response);
          this.getServicios(); // Actualiza la lista después de actualizar
          this.resetForm(); // Resetea el formulario
        },
        (error) => {
          console.error("Error al actualizar servicio:", error); //En caso de error
        }
      );
    }
  }
 eliminar(ser: IServicio) {
  if (confirm("¿Estás seguro de eliminar este servicio?")) {
      this.service.eliminarServicio(ser.id_servicio).subscribe(
          () => {
              this.getServicios();
          }
      );
  }
}
}