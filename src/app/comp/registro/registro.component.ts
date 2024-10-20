import { Component } from '@angular/core';
import { HuespedService } from '../../service/huesped.service';
import { Huesped } from '../../model/huesped';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [NgFor,FormsModule,RouterLink],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {

  constructor(private service:HuespedService) {}
  huesped = new Huesped();
  insUpd = true;
  textoBoton ="Registrarse";

  resetForm(){
    this.huesped = new Huesped();
    this.insUpd=true;
    this.textoBoton="Agregar";
  }
  agregar(){
    if(this.insUpd){
      this.service.insertarHuesped(this.huesped).subscribe(
          (resp)=>{

            this.insUpd=false;


          }
      );

    }else{
      this.service.actualizarHuesped(this.huesped).subscribe(
        (resp)=>{

          this.insUpd=true;


    }
  );
  }
  this.textoBoton ="Agregar";
 }



}
