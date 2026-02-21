import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication';

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

    this.authService.login(this.credentials).subscribe({
      next: () => this.router.navigate(['/']),
      error: () => this.errorMessage = 'Login failed. Check email/password.'
    });
  }
}
