import { HttpErrorResponse, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { catchError, tap, throwError, } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd/message';

export const interceptorInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const route = inject(Router);
  const message = inject(NzMessageService);
  const authToken = authService.getToken();
  let authReq: HttpRequest<any>;
  if (!authToken && req.url !== "/users/login") {
    route.navigateByUrl('login');
  }
  authReq = req.clone({
    url: `${environment.apiUrl}${req.url}`,
    setHeaders: {
      Authorization: `Bearer ${authToken}`
    }
  });
  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.error) {
        message.create('error', error.error.message)
        if (error.status === 403) {
          authService.removeToken();
        }
      }
      return throwError(error);
    })
  );
};
