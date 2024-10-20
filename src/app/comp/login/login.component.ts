import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,
    FormsModule,HttpClientModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  correo: string ="";
  clave: string ="";

  constructor(private http: HttpClient,private router: Router,private authService: AuthService,@Inject(PLATFORM_ID) private platformId: Object) {}

  isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  login(): void{
    this.authService.login(this.correo, this.clave).subscribe({
      next: (response)=> {
        const token = response.token;
        const payload = JSON.parse(atob(token.split('.')[1]));
        const tipo = payload.tipo;

        this.setUserType(tipo);

        if(tipo === 'admin'){
          this.router.navigate(['/inicio'])
        }else{
          this.router.navigate(['/inicio'])
        }

      },
      error: (err) => console.error('Login Fallido', err)
    })
  }
  private setUserType(tipo: string): void {
    if (this.isBrowser()) {
      localStorage.setItem('userType', tipo);
    }
  }

  getUserType(): string | null {
    if (this.isBrowser()) {
      return localStorage.getItem('userType');
    }
    return null;
  }

}
