import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BillService {

  constructor(private http: HttpClient) { }

  getBills(): Observable<any> {
    return this.http.get<any>(`/bill`);
  }

  createBill(bill: any): Observable<any> {
    return this.http.post<any>(`/bill`, bill);
  }

  deleteBill(id: string): Observable<any> {
    return this.http.delete<any>(`/bill/${id}`);
  }
  
  getBill(id: string): Observable<any> {
    return this.http.get<any>(`/bill/${id}`);
  }
}
