import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api/api.service'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly AUTH_KEY = 'authDetails';
  private islogin: boolean = false;
  authStatus = new EventEmitter<string>();

  constructor(private router: Router,
    private apiService: ApiService
  ) { }

  async login(username: string, password: string): Promise<boolean> {
    try {
      const payload = { username, password };
      const response = await this.apiService.userLogin(payload).toPromise();
      if (response.body) {
        this.authStatus.emit("LogOut");
        this.islogin = true;
        sessionStorage.setItem(this.AUTH_KEY, JSON.stringify(response.body));
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
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
