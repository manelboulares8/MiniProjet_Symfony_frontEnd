import { Component, OnInit } from '@angular/core';
import { Client } from '../models/client.model';
import { ClientService } from '../services/client.service';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-lister-clients',
  templateUrl: './lister-clients.component.html',
  standalone:false,
  styleUrls: ['./lister-clients.component.css']
})
export class ListerClientsComponent implements OnInit {
  clients: Client[] = [];
  selectedClient: Client | null = null;
  isAdmin: boolean = false;

  constructor(
    private clientService: ClientService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin();
    this.loadClients();
  }

  loadClients(): void {
    this.clientService.getUsers().subscribe({
      next: (clients) => this.clients = clients,
      error: (err) => console.error('Erreur chargement clients:', err)
    });
  }

  selectClient(client: Client): void {
    this.selectedClient = { ...client };
  }

  updateClient(): void {
    if (this.selectedClient) {
      this.clientService.updateClient(this.selectedClient.id!, this.selectedClient)
        .subscribe({
          next: () => {
            this.loadClients();
            this.selectedClient = null;
          },
          error: (err) => console.error('Erreur mise à jour:', err)
        });
    }
  }

  deleteClient(id: number): void {
    if (confirm('Confirmer la suppression ?')) {
      this.clientService.deleteClient(id).subscribe({
        next: () => this.loadClients(),
        error: (err) => console.error('Erreur suppression:', err)
      });
    }
  }
}