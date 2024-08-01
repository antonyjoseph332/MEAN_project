import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  loginUser(user: any): Observable<any> {
    return this.http.post<any>(`/users/login`, user);
  }

  getUsers(): Observable<any> {
    return this.http.get<any>(`/users`);
  }

  createUser(user: any): Observable<any> {
    return this.http.post<any>(`/users`, user);
  }

  updateUser(user: any, id: string): Observable<any> {
    return this.http.put<any>(`/users/${id}`, user);
  }

  getUserById(id: string): Observable<any> {
    return this.http.get<any>(`/users/${id}`);
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete<any>(`/users/${id}`);
  }
}
