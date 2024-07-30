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

  createUser(user: any): Observable<any> {
    return this.http.post<any>(`/users`, user);
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete<any>(`/users/${id}`);
  }
}
