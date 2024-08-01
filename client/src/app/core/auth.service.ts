import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'auth_token';
  private userKey = 'current_user';

  constructor(private cookieService: CookieService) { }

  setUserAndToken(data: any): void {
    this.cookieService.set(this.tokenKey, data.token);
    this.cookieService.set(this.userKey, JSON.stringify(data.user));
  }

  getUser(): string | null {
    const user = this.cookieService.get(this.userKey);
    return JSON.parse(user) || ''
  }

  getToken(): string | null {
    return this.cookieService.get(this.tokenKey) || '';
  }

  removeToken(): void {
    this.cookieService.delete(this.tokenKey, '');
  }
}
