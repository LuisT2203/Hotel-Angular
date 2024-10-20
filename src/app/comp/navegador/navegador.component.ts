import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { CommonModule, NgFor } from '@angular/common';
import { LoginComponent } from '../login/login.component';
import { HuespedService } from '../../service/huesped.service';
import { Huesped } from '../../model/huesped';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-navegador',
  standalone: true,
  imports: [RouterLink,CommonModule,NgFor,FormsModule],
  templateUrl: './navegador.component.html',
  styleUrl: './navegador.component.css'
})
export class NavegadorComponent {

  constructor(public authService: AuthService,private service:HuespedService ) {}

  huesped = new Huesped();
  insUpd = true;
  textoBoton ="Agregar";

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

  logout() {
    this.authService.logout();
  }

}
