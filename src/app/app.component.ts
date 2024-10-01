import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NavegadorComponent } from './comp/navegador/navegador.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavegadorComponent,RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Gestor de Hotel';
}
