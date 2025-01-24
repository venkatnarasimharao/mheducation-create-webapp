import { CookieService } from 'ngx-cookie-service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonStateService {

  constructor(private cookieService: CookieService) { }
  public isAnonymous() {
    const paris_user_id = this.cookieService.get('paris_user_id');
    return paris_user_id ? false : true;
  }
  public getUserId() {
    if (this.isAnonymous()) {
      return "";
    }
    return this.cookieService.get('paris_user_id');
  }
}
