import { Injectable, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { BROWSER_STORAGE } from '../storage';
import { User } from '../models/user';
import { AuthResponse } from '../models/auth-response';
import { TripDataService } from './trip-data';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  constructor(
    @Inject(BROWSER_STORAGE) private storage: Storage,
    private tripDataService: TripDataService
  ) { }

  public getToken(): string {
    return this.storage.getItem('travlr-token') ?? '';
  }

  public saveToken(token: string): void {
    this.storage.setItem('travlr-token', token);
  }

  public logout(): void {
    this.storage.removeItem('travlr-token');
  }

  public isLoggedIn(): boolean {
    const token = this.getToken();
    if (!token) return false;
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp > (Date.now() / 1000);
  }

  public login(credentials: { email: string; password: string }): Observable<AuthResponse> {
    return this.tripDataService.login(credentials).pipe(
      tap((resp: AuthResponse) => {
        if (resp?.token) this.saveToken(resp.token);
      })
    );
  }

  public register(credentials: { name: string; email: string; password: string }): Observable<AuthResponse> {
    return this.tripDataService.register(credentials).pipe(
      tap((resp: AuthResponse) => {
        if (resp?.token) this.saveToken(resp.token);
      })
    );
  }
}
