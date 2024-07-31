import { HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

export const interceptorInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const route = inject(Router);
  const authToken = authService.getToken();
  let authReq: HttpRequest<any>;

  if (!authToken) {
    route.navigateByUrl('login');
  }
  authReq = req.clone({
    url: `${environment.apiUrl}${req.url}`,
    setHeaders: {
      Authorization: `Bearer ${authToken}`
    }
  });
  return next(authReq);
};
