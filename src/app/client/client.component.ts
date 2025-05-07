import { Component, OnInit } from '@angular/core';
import { Client } from '../models/client.model';
import { ClientService } from '../services/client.service';

@Component({
  selector: 'app-client',
  standalone: false,
  templateUrl: './client.component.html',
  styleUrl: './client.component.css'
})
export class ClientComponent implements OnInit {
  clients: Client[] = [];
  searchText: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 6;

  constructor(private clientService: ClientService) { }

  ngOnInit(): void {
    this.loadClients();
  }

  loadClients(): void {
    this.clientService.getAll().subscribe({
      next: (clients) => {
        this.clients = clients;
      },
      error: (err) => {
        console.error('Error loading clients:', err);
      }
    });
  }

  paginatedClients(): Client[] {
    const filtered = this.clients.filter(client =>
      client.nom.toLowerCase().includes(this.searchText.toLowerCase()) ||
      client.email.toLowerCase().includes(this.searchText.toLowerCase())
    );

    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return filtered.slice(startIndex, startIndex + this.itemsPerPage);
  }

  totalPages(): number[] {
    const filtered = this.clients.filter(client =>
      client.nom.toLowerCase().includes(this.searchText.toLowerCase()) ||
      client.email.toLowerCase().includes(this.searchText.toLowerCase())
    );

    const pageCount = Math.ceil(filtered.length / this.itemsPerPage);
    return Array.from({ length: pageCount }, (_, i) => i + 1);
  }

  editClient(id: number): void {
    // Implémentez la logique d'édition
    console.log('Edit client:', id);
  }

  viewDetails(id: number): void {
    // Implémentez la vue des détails
    console.log('View details:', id);
  }

  deleteClient(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce client ?')) {
      this.clientService.delete(id).subscribe({
        next: () => {
          this.clients = this.clients.filter(c => c.id !== id);
        },
        error: (err) => {
          console.error('Error deleting client:', err);
        }
      });
    }
  }
}