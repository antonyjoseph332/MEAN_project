import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const tokenGuardGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);
  const router = inject(Router);
  const token = authService.getToken();
  if (token && route.routeConfig?.path === 'login') {
    router.navigateByUrl('');
    return false;
  } else if (!token && route.routeConfig?.path !== 'login') {
    router.navigateByUrl('login');
    return false;
  } else {
    return true
  }
};
