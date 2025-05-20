import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
,
  standalone:false
})
export class LoginComponent {
  email = '';
  password = '';
  error = '';

  constructor(private auth: AuthService, private router: Router) {}

  onLogin() {
    this.auth.login(this.email, this.password).subscribe({
      next: (data: any) => {
        localStorage.setItem('user', JSON.stringify(data));
        if (data.role === 'admin') {
          this.router.navigate(['/lister-articles']);
        } else {
          this.router.navigate(['/lister-articles']);
        }
      },
      error: () => {
        this.error = 'Email ou mot de passe incorrect';
      }
    });
  }
}
