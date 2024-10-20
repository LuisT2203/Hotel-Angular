import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

export const authenticatedGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    // Si el usuario está autenticado, permite el acceso
    return  router.navigate(['/inicio']);

  } else {
    // Si no está autenticado, redirige al login
    return true;

  }
};
