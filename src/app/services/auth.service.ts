import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = 'http://localhost:8000/api/clients';

  //constructor(private http: HttpClient) {}
/*
  login(email: string, password: string) {
      console.log('Login data:', { email, password }); // debug

    return this.http.post(`${this.baseUrl}/login`, { email, password }, {
    withCredentials: true // 🔥 à ne pas oublier
  });
  }*/
 private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient) {
    const userJson = localStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<any>(userJson ? JSON.parse(userJson) : null);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue() {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>('http://localhost:8000/api/clients/login', { email, password })
      .pipe(map(user => {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
      }));
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
 getUserRole(): string {
    return this.currentUserValue?.role ; // Retourne 'user' par défaut
  }

  isAdmin(): boolean {
    return this.getUserRole() === 'admin';
  }

  getUserId(): number | null {
    return this.currentUserValue?.id || null;
  }
}
