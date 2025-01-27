import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../../../environments/environment';

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

  getImageUrl(endPointUrl: string, nonDev = true): string {
    console.log(environment.apiUrl, 'check this')
    if (nonDev) {
      return environment.apiUrl + endPointUrl;
    }
    // TODO currently pointing to qa
    return 'https://createqa.mheducation.com' + endPointUrl;
  }
}
