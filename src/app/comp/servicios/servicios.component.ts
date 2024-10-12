import { Component, OnInit } from '@angular/core';
import { ServicioService } from '../../service/servicio.service';
import { IServicio } from '../../model/iServicio';
import { Servicio } from '../../model/servicio';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
    this.getservicios();
  }
  resetForm(){
    this.servicio = new Servicio();
    this.insUpd=true;
    this.textoBoton="Agregar";
  }
  getservicios(){
    this.service.getServicios().subscribe(
      (result:any)=>this.servicios=result
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
          (resp)=>{
            this.getservicios();
            this.insUpd=false;


          }
      );

    }else{
      this.service.actualizarServicio(this.servicio).subscribe(
        (resp)=>{
          this.getservicios();
          this.insUpd=true;


    }
  );
  }
  this.textoBoton ="Agregar";
 }
 eliminar(ser: IServicio) {
  if (confirm("¿Estás seguro de eliminar este servicio?")) {
      this.service.eliminarServicio(ser.id_servicio).subscribe(
          () => {
              this.getservicios(); // Actualizar la lista después de eliminar
          }
      );
  }
}
}
