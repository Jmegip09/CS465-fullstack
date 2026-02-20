import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication';
import { User } from '../models/user';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html'
})
export class LoginComponent {

  credentials = {
    email: '',
    password: ''
  };
  errorMessage = '';

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) { }

  onLogin(): void {
    this.errorMessage = '';
    const user: User = {
      email: this.credentials.email,
      name: ''
    };

    // Login is async so we give it a moment before checking
    this.authService.login(user, this.credentials.password);
    setTimeout(() => {
      if (this.authService.isLoggedIn()) {
        this.router.navigate(['/']);
      } else {
        this.errorMessage = 'Login failed. Check email/password.';
      }
    }, 500);
  }
}
