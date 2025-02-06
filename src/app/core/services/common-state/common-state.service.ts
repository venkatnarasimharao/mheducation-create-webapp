import { CookieService } from 'ngx-cookie-service';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { clientUrl } from '../../../../assets/env';

@Injectable({
  providedIn: 'root'
})
export class CommonStateService {
  private userId = 'paris_user_id';

  constructor(private cookieService: CookieService) { }
  public isAnonymous() {
    return this.cookieService.get(this.userId)
  }

  getImageUrl(endPointUrl: string, nonDev = true): string {
    if (nonDev) {
      return environment.apiUrl + endPointUrl;
    }
    // TODO currently pointing to qa
    return 'https://createqa.mheducation.com' + endPointUrl;
  }

}

// https://createqa.mheducation.com/createonline/images/bad_preview.jpg
