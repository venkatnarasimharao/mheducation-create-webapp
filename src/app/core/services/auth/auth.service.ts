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


  login(username: string, password: string): void {
    const payload = { username, password };
    this.loginStatusSubject.next('pending');
    this.apiService.userLogin(payload).subscribe((response) => {
      if (response.status === 200) {
        this.authStatus.emit("LogOut");
        this.manageCookiesStorage(JSON.parse(response.body));
        this.loginStatusSubject.next('success');
      }
      else {
        this.loginStatusSubject.next('failed');
      }

    },
      () => {
        this.loginStatusSubject.next('failed');
      })
  }

  public isAnonymous(): boolean {
    const paris_user_id = this.cookieService.get('paris_user_id');
    return paris_user_id ? true : false;
  }

  logout(): void {
    this.apiService.userLogOut(this.cookieService.get('paris_user_id')).subscribe((data) => {
      this.cookieService.deleteAll();
      this.router.navigate(['/']);
    });
  }
}
