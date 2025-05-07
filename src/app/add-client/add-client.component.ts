import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Client } from '../models/client.model';
import { ClientService } from '../services/client.service';


@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css'],
  standalone: false // Assurez-vous de ne pas avoir `standalone: true` ici

})
export class AddClientComponent {
  @Output() clientAdded = new EventEmitter<Client>();
  clientForm: FormGroup;
  isLoading = false;
  errorMessage = '';
  successMessage: string = '';
  showSuccess: boolean = false;
  showError: boolean = false;
  constructor(
    private fb: FormBuilder,
    private clientService: ClientService
  ) {
    this.clientForm = this.fb.group({
      nom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      adresse: ['', Validators.required]
    });
  }

  onSubmit(): void {
    // Marquer tous les champs comme touchés pour afficher les erreurs de validation
    if (this.clientForm.invalid) {
      this.clientForm.markAllAsTouched();
      this.errorMessage = 'Veuillez corriger les erreurs dans le formulaire';
      return;
    }
  
    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = ''; // Réinitialiser le message de succès
  
    const newClient: Client = {
      nom: this.clientForm.value.nom,
      email: this.clientForm.value.email,
      adresse: this.clientForm.value.adresse
    };
  
    this.clientService.create(newClient).subscribe({
      next: (createdClient) => {
        this.successMessage = 'Client ajouté avec succès !';
        this.clientAdded.emit(createdClient);
        this.clientForm.reset();
        
        // Optionnel : masquer le message après 5 secondes
        setTimeout(() => {
          this.successMessage = '';
        }, 5000);
      },
      error: (err) => {
        console.error('Erreur API:', err);
        
        // Messages d'erreur spécifiques selon le type d'erreur
        if (err.status === 0) {
          this.errorMessage = 'Impossible de se connecter au serveur';
        } else if (err.status === 400) {
          this.errorMessage = 'Données invalides : ' + (err.error?.message || 'Vérifiez les informations');
        } else if (err.status === 409) {
          this.errorMessage = 'Ce client existe déjà';
        } else {
          this.errorMessage = 'Une erreur est survenue lors de l\'ajout du client';
        }
        
        // Optionnel : masquer le message après 5 secondes
        setTimeout(() => {
          this.errorMessage = '';
        }, 5000);
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }}