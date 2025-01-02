import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly AUTH_KEY = 'authDetails'; // Key for sessionStorage
  private islogin: boolean = false;

  constructor(private router: Router) { }

  login(username: string, password: string): boolean {
    if (username && password) {
      const authDetails = {
        username,
        token: 'dummy-auth-token', // Example token
      };
      sessionStorage.setItem(this.AUTH_KEY, JSON.stringify(authDetails));

      return true;
    }
    return false;
  }

  getAuthDetails(): any {
    const authDetails = sessionStorage.getItem(this.AUTH_KEY);
    return authDetails ? JSON.parse(authDetails) : null;
  }

  isLoggedIn(): boolean {
    if (this.islogin) {
      return true;
    }
    return this.islogin = (this.getAuthDetails() !== null); // If sessionStorage contains auth details, user is logged in
  }
  logout(): void {
    sessionStorage.removeItem(this.AUTH_KEY);
    this.islogin = false;
    this.router.navigate(['/']); // Optionally, redirect to a public page
  }
}
