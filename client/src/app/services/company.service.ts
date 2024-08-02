import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private http: HttpClient) { }

  getCompanys(): Observable<any> {
    return this.http.get<any>(`/company`);
  }

  createCompany(company: any): Observable<any> {
    return this.http.post<any>(`/company`, company);
  }

  updateCompany(company: any, id: string): Observable<any> {
    return this.http.put<any>(`/company/${id}`, company);
  }

  getCompanyById(id: string): Observable<any> {
    return this.http.get<any>(`/company/${id}`);
  }

  deleteCompany(id: string): Observable<any> {
    return this.http.delete<any>(`/company/${id}`);
  }
}
