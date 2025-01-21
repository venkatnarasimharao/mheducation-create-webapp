import { CookieService } from 'ngx-cookie-service';
import { EventEmitter, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api/api.service'
import { BehaviorSubject, catchError, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authStatus = new EventEmitter<string>();
  private loginStatusSubject = new BehaviorSubject<'pending' | 'success' | 'failed'>('pending');
  loginStatus$ = this.loginStatusSubject.asObservable();
  loginError: any = '';

  constructor(private router: Router,
    private apiService: ApiService,
    private cookieService: CookieService
  ) { }
  manageCookiesStorage(data: any) {
    const { profile } = data
    this.cookieService.set("paris_user_id", data.paris_user_id);
    this.cookieService.set("user_email", data.user_email);
    this.cookieService.set("jsessionid", data.jsessionid);
    this.cookieService.set("userCountry", profile.userCountry);
    this.cookieService.set("userRoles", profile.roles);
    this.cookieService.set("userFirstName", profile.firstName);
    this.cookieService.set("userLastName", profile.lastName);
  }
  login(username: string, password: any): void {
    const payload = { username, password };
    this.loginStatusSubject.next('pending');

    this.apiService.userLogin(payload).subscribe({
      next: (response) => {
        console.log(response?.headers?.keys(), 'headers', response.headers);
        if (response.ok) {
          this.authStatus.emit("LogOut");
          this.manageCookiesStorage(JSON.parse(response.body));
          this.loginStatusSubject.next('success');
        } else {
          this.loginStatusSubject.next('failed');
        }
      },
      error: (err: any) => {
        this.loginError = JSON.parse(err.error).message;
        this.loginStatusSubject.next('failed');
      }
    });
  }
  public isAnonymous(): boolean {
    const paris_user_id = this.cookieService.get('paris_user_id');
    return paris_user_id ? false : true;
  }
  public getLoginErrorMessage(): string {
    return this.loginError;
  }

  logout(): void {
    this.apiService.userLogOut(this.cookieService.get('paris_user_id')).subscribe((data) => {
      this.cookieService.deleteAll();
      this.router.navigate(['/']);
      this.authStatus.emit("LogIn");

    });
  }
}
