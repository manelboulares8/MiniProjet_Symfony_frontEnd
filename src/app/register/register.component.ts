import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientService } from '../services/client.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  standalone:false,
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private clientService: ClientService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      nom: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      adresse: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.clientService.registerClient(this.registerForm.value).subscribe({
        next: (response) => {
          this.successMessage = 'Inscription réussie! Redirection...';
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 2000);
        },
        error: (err) => {
          this.errorMessage = err.error?.error || 'Erreur lors de l\'inscription';
        }
      });
    }
  }
}