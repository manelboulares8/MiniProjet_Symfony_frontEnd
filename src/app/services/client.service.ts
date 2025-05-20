import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Client } from '../models/client.model';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private apiUrl = 'http://localhost:8000/api/clients';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Client[]> {
    return this.http.get<Client[]>(`${this.apiUrl}/all`);
}

  get(id: any): Observable<Client> {
    return this.http.get<Client>(`${this.apiUrl}/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  registerClient(clientData: {
  nom: string,
  email: string,
  password: string,
  adresse: string
}): Observable<any> {
  return this.http.post(`${this.apiUrl}/register`, clientData).pipe(
    catchError(error => {
      console.error('Registration error:', error);
      return throwError(() => error);
    })
  );
}
getUsers(): Observable<Client[]> {
    return this.http.get<Client[]>(`${this.apiUrl}/users`);
  }

  updateClient(id: number, client: Partial<Client>): Observable<Client> {
    return this.http.put<Client>(`${this.apiUrl}/${id}`, client);
  }

  deleteClient(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}