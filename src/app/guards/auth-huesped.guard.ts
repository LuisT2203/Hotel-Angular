import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

export const authHuespedGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);


  if (authService.isAuthenticated()) {
    const userType = authService.getUserType();
    if (userType === 'Huesped') {
      // Si el usuario es huésped, permite el acceso
      return true;
    } else {
      return true;
    }
  } else {
    // Si no está autenticado, redirige al login
    return router.navigate(['/login']);
  }
};
