import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Article {
  id: number;
  nom: string;
  description: string;
  prix: number;
  stock: number;
}

@Injectable({ providedIn: 'root' })
export class ArticleService {
  private apiUrl = 'http://localhost:8000/api/articles';

  constructor(private http: HttpClient) {}

  getArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(this.apiUrl, {
    withCredentials: true // 🔥 à ne pas oublier
  });
  }
  addArticle(article: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/add`, article);
  }
  getArticleById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`, {
    withCredentials: true // 🔥 à ne pas oublier
  });
  }
  
  updateArticle(id: number, article: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, article);
  }
  deleteArticle(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  searchArticlesByPrice(min: number, max: number): Observable<Article[]> {
    let params = new HttpParams().set('min', min).set('max', max);
    return this.http.get<Article[]>(`${this.apiUrl}/searchByPrice`, { params });
  }
}
