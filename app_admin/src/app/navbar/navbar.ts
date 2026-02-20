import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { RouterModule } from '@angular/router';
import { AuthenticationService } from '../services/authentication';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class NavbarComponent implements OnInit {

  constructor(
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() { }

  // Check if user is currently logged in with valid token
  public isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }

  // Log the user out and clear the JWT from storage
  public onLogout(): void {
    return this.authenticationService.logout();
  }
}
