import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NavegadorComponent } from '../navegador/navegador.component';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [RouterOutlet, NavegadorComponent,RouterLink],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {

}
