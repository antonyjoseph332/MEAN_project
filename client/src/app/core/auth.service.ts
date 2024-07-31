import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'auth_token';

  constructor(private cookieService: CookieService) { }

  setToken(token: string): void {
    this.cookieService.set(this.tokenKey, token);
  }

  getToken(): string | null {
    return this.cookieService.get(this.tokenKey) || null;
  }

  removeToken(): void {
    this.cookieService.delete(this.tokenKey, '/');
  }
}
