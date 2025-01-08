import { CookieService } from 'ng2-cookies';
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
    private apiService: ApiService,
    private cookieService: CookieService
  ) { }
  manageCookiesStorage(data: any) {
    this.cookieService.set("paris_user_id", data.paris_user_id);
    this.cookieService.set("user_email", data.user_email);
    this.cookieService.set("userCountry", data.userCountry);
    this.cookieService.set("jsessionid", data.jsessionid);
  }

  async login(username: string, password: string): Promise<boolean> {
    try {
      const payload = { username, password };
      const response = await this.apiService.userLogin(payload).toPromise();
      if (response.body) {
        this.authStatus.emit("LogOut");
        this.islogin = true;
        console.log(response.body);
        this.manageCookiesStorage(JSON.parse(response.body));
        // sessionStorage.setItem(this.AUTH_KEY, JSON.stringify(response.body));
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  }



  getAuthDetails(): any {
    const authDetails = this.cookieService.get('paris_user_id');
    return authDetails ? JSON.parse(authDetails) : null;
  }

  isLoggedIn(): boolean {
    if (this.islogin) {
      return true;
    }
    return this.islogin = (this.getAuthDetails() !== null); // If sessionStorage contains auth details, user is logged in
  }
  logout(): void {
    this.apiService.userLogOut(this.cookieService.get('paris_user_id'));
    this.cookieService.deleteAll();
    this.islogin = false;
    this.router.navigate(['/']); // Optionally, redirect to a public page
  }
}
