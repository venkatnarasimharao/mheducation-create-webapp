import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommonStateService {
  private userId = 'paris_user_id';

  constructor(private cookieService: CookieService) { }
  public isAnonymous() {
    return this.cookieService.get(this.userId);
  }

  public getUserId() {
    if (this.isAnonymous()) {
      return "";
    }
    return this.cookieService.get('paris_user_id');
  }

  getImageUrl(endPointUrl: string, nonDev = true): string {
    if (nonDev) {
      return environment.apiUrl + endPointUrl;
    }
    // TODO currently pointing to qa
    return 'https://createqa.mheducation.com' + endPointUrl;
  }
  
}
