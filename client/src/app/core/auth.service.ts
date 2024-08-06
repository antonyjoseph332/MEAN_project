import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'auth_token';
  private userKey = 'current_user';

  constructor(private cookieService: CookieService, private route: Router) { }

  setUserAndToken(data: any) {
    localStorage.setItem(this.tokenKey, data.token);
    localStorage.setItem(this.userKey, JSON.stringify(data.user));
  }

  getUser() {
    const user: any = localStorage.getItem(this.userKey);
    return JSON.parse(user) || {}
  }

  getToken() {
    return localStorage.getItem(this.tokenKey) || '';
  }

  removeToken() {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
    this.route.navigateByUrl('login');
  }
}
