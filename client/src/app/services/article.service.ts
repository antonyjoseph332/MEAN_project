import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
 
  constructor(private http: HttpClient) { }

  getArticles(): Observable<any> {
    return this.http.get<any>(`/article`);
  }

  createArticle(article: any): Observable<any> {
    return this.http.post<any>(`/article`, article);
  }

  deleteArticle(id: string): Observable<any> {
    return this.http.delete<any>(`/article/${id}`);
  }
}
