import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { NavegadorComponent } from './comp/navegador/navegador.component';
import { CommonModule } from '@angular/common';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavegadorComponent,RouterLink,CommonModule,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'Gestor de Hotel';
  showNavAndFooter: boolean = true;

  constructor(private router: Router,public authService: AuthService) {
    // Suscríbete a los eventos de navegación
    this.router.events.subscribe(() => {
      // Oculta el navegador y footer si la ruta actual es "/login"
      this.showNavAndFooter = this.router.url !== '/login';
    });
  }
  ngOnInit(): void {
    if(this.authService.isAuthenticated()){
      this.authService.autoRefreshToken();
    }
  }
}
