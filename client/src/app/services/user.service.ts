import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUsers(): Observable<any> {
    return this.http.get<any>(`/users`);
  }

  loginUser(user: any): Observable<any> {
    return this.http.post<any>(`/users/login`, user);
  }

  createUser(user: any): Observable<any> {
    return this.http.post<any>(`/users`, user);
  }

  getUserById(id: string): Observable<any> {
    return this.http.get<any>(`/users/${id}`);
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete<any>(`/users/${id}`);
  }
}
