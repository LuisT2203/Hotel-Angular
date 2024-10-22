import { Component, OnInit } from '@angular/core';
import { HabitacionService } from '../../service/habitacion.service';
import { IHabitacion } from '../../pages/model/iHabitacion';
import { NgClass, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Habitacion } from '../../pages/model/habitacion';
import { ResponseLista } from '../../pages/model/ResponseLista';
import { error } from 'console';


@Component({
  selector: 'app-habitaciones',
  standalone: true,
  imports: [NgFor,FormsModule,NgClass],
  templateUrl: './habitaciones.component.html',
  styleUrl: './habitaciones.component.css'
})

export class HabitacionesComponent implements OnInit {
  constructor(private service:HabitacionService){}

  habitaciones: IHabitacion[]=[]
  textoBoton ="Agregar";
  habitacion = new Habitacion();
  insUpd = true;


  ngOnInit(): void {
    this.getHabitaciones();
  }

  resetForm(){
    this.habitacion = new Habitacion();
    this.insUpd=true;
    this.textoBoton="Agregar";
  }

  getHabitaciones(){
    this.service.getHabitaciones().subscribe(
      (result: ResponseLista) => {
        this.habitaciones = result.object; // Asigna la lista de Habitaciones a la propiedad habitaciones
      },
      (error: any) =>{
        console.error("Error al obtener las habitaciones: ", error)
      }
    );
  }

  editar(hab: IHabitacion){
    this.textoBoton ="Actualizar"; // Cambiar el texto del botón a "Actualizar"
    this.insUpd = false; // Indica que el formulario esta en modo para actualizar
    this.habitacion = {
      nro_habi: hab.nro_habi,
      descripcion: hab.descripcion,
      estado: hab.estado,
      precio_habi: hab.precio_habi
      
    };
  }

  agregar(){
    if(this.insUpd){
      // Logica para agregar una nueva habitacion
      this.service.insertarHabitacion(this.habitacion).subscribe(
          () => {
            this.getHabitaciones(); //Actualiza la lista despues de agregar
            this.resetForm; // Resetea el formulario
          },
          (error) =>{
            console.error("Error al agregar habitacion: ", error); //En caso de error que lo muestre en consola
          }
      );
    } else{
      //Lógica para actualizar la habitacion existente
      this.service.actualizarHabitacion(this.habitacion).subscribe(
        (response) => {
          console.log("Habitación actualizada", response);
          this.getHabitaciones(); //Actualizar la lista despues de actaualizar
          this.resetForm(); //Resetea el formulario
    },
    (error) => {
      console.error("Error al actualizar la habitacion: ", error); //En caso de error que sea mostrado en consola
    }
  );
  }
 }

 
 eliminar(hab: IHabitacion) {
  if (confirm("¿Estás seguro de eliminar esta habitación?")) {
      this.service.eliminarHabitacion(hab.nro_habi).subscribe(
          () => {
              this.getHabitaciones(); // Actualizar la lista después de eliminar
          }
      );
  }
}
}
