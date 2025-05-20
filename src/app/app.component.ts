import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'gestion-stock';

   isAdmin: boolean = false;
constructor(private authService:AuthService){}
  ngOnInit(): void {
        this.isAdmin = this.authService.isAdmin();

}
}