import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { Commande } from '../models/commande.model';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CommandeService {
  private apiUrl = 'http://localhost:8000/api/commandes'; // adapte à ton API

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService:  AuthService
  ) { }

 /* getCommandes(): Observable<Commande[]> {
    return this.http.get<Commande[]>(this.apiUrl);
  }
*/
  getCommande(id: number): Observable<Commande> {
    return this.http.get<Commande>(`${this.apiUrl}/${id}`);
  }

 /*addCommande(commande: Commande): Observable<any> {
  console.log('Commande à envoyer:', commande);

    const options = {
      withCredentials: true, // Essentiel pour envoyer les cookies
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post<any>(this.apiUrl, commande,{withCredentials: true}).pipe(
      catchError((error) => {
        if (error.status === 401) {
          // Redirection vers la page de login si non authentifié
          this.router.navigate(['/login']);
        }
        return throwError(error);
      })
    );
  }*/
 addCommande(commande: any): Observable<any> {
    commande.clientId = this.authService.getUserId(); 
    console.log(commande);
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  return this.http.post<any>(this.apiUrl, commande, {
    headers: headers,
    withCredentials: true
  }).pipe(
    catchError((error) => {
      if (error.status === 401) {
        this.router.navigate(['/login']);
      }
      return throwError(error);
    })
  );
}

  updateCommande(id: number, commande: Commande): Observable<Commande> {
    return this.http.put<Commande>(`${this.apiUrl}/${id}`, commande);
  }

  deleteCommande(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  getByClient(clientId: number): Observable<Commande[]> {
    return this.http.get<Commande[]>(`${this.apiUrl}?client=${clientId}`);
  }

 getCommandes(): Observable<Commande[]> {
    if (this.authService.isAdmin()) {
      console.log('!!!!!!!!!!!!!!heyyyy m admin ')
      return this.getAllCommandes();
    } else {
      const userId = this.authService.getUserId();
      console.log('?????heyyyyyyy user',userId);
      if (!userId) {
        this.router.navigate(['/login']);
        return throwError(() => new Error('User not authenticated'));
      }
      return this.getClientCommandes(userId);
    }
  }

  private getAllCommandes(): Observable<Commande[]> {
    return this.http.get<Commande[]>(this.apiUrl);
  }

  private getClientCommandes(userId: number): Observable<Commande[]> {
    return this.http.get<Commande[]>(`${this.apiUrl}/client/${userId}`, { 
      withCredentials: true 
    }).pipe(
      catchError(this.handleError)
    );
  }
   private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }
getClientNameByCommandeId(commandeId: number): Observable<string> {
  return this.http.get<{clientName: string}>(`${this.apiUrl}/${commandeId}/client-name`, {
    withCredentials: true
  }).pipe(
    map(response => response.clientName),
    catchError(error => {
      console.error('Error fetching client name:', error);
      return of('Client inconnu');
    })
  );
}
}
