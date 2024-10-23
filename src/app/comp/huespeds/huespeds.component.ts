import { Component, OnInit } from '@angular/core';
import { HuespedService } from '../../service/huesped.service';
import { IHuesped } from '../../model/iHuesped';
import { Huesped } from '../../model/huesped';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MensajeResponse } from '../../model/MensajeResponse';

@Component({
  selector: 'app-huespeds',
  standalone: true,
  imports: [NgFor,FormsModule],
  templateUrl: './huespeds.component.html',
  styleUrl: './huespeds.component.css'
})
export class HuespedsComponent implements OnInit {

   constructor(private service:HuespedService,private toastr: ToastrService){}

  huespedes: IHuesped[]=[]
  textoBoton ="Agregar";
  huesped = new Huesped();
  insUpd = true;


  ngOnInit(): void {
    this.gethuespedes();
  }
  resetForm(){
    this.huesped = new Huesped();
    this.insUpd=true;
    this.textoBoton="Agregar";
  }
  gethuespedes(){
    this.service.getHuespedes().subscribe(
      (result:any)=>{
        this.huespedes=result.object

      },
      error => {
        console.error('Error al obtener los huespeds', error);
        this.toastr.error(error.error, 'Error');
      }
    );
  }
  editar(hue: IHuesped){
    this.textoBoton ="Actualizar";
    this.insUpd = false;
    this,this.service.getHuesped(hue.id_huesped).subscribe(
      (data:any)=> this.huesped = data
    );
  }

  agregar(){
    if(this.insUpd){
      this.service.insertarHuesped(this.huesped).subscribe(
          (resp: MensajeResponse)=>{
            this.toastr.success(resp.mensaje, 'Éxito');
            this.gethuespedes();
            this.insUpd=false;
          },
          (error) => {
            console.error('Error al agregar:', error);
            this.toastr.error(error.error, 'Error');
          }
      );

    }else{
      this.service.actualizarHuesped(this.huesped).subscribe(
        (respresp: MensajeResponse)=>{
          this.gethuespedes();
          this.insUpd=true;
    },
    (error) => {
      console.error('Error al agregar:', error);
      this.toastr.error(error.error.mensaje, 'Error');
    }
  );
  }
  this.textoBoton ="Agregar";
 }
 eliminar(hue: IHuesped) {
  if (confirm("¿Estás seguro de eliminar esta huesped?")) {
      this.service.eliminarHuesped(hue.id_huesped).subscribe(
          (resp :MensajeResponse) => {
            this.toastr.success(resp.mensaje, 'Éxito');
              this.gethuespedes(); // Actualizar la lista después de eliminar
          },
          (error) => {
            console.error('Error al eliminar:', error);
            this.toastr.error(error.error, 'Error');
          }
      );
  }
}

}
