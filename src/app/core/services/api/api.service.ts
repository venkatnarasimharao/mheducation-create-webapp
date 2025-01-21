import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BOOK_COVER_IMAGES, USER_SEARCH_CONFIG } from '../../../shared/constants/search-payload.config';
import { environment } from '../../../../environments/environment';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient,
    private cookieService: CookieService
  ) { }

  public isAnonymous(): boolean {
    const paris_user_id = this.cookieService.get('paris_user_id');
    return paris_user_id ? false : true;
  }
  getSearchListing() {
    const finalPay = USER_SEARCH_CONFIG
    let languages: any = sessionStorage.getItem('languages');
    if (languages) {
      languages = JSON.parse(languages);
      finalPay['search']['facets']['facet'][4]['item'] = languages.map((item: any) => ({
        _label: item.displayValue._text,
        _value: item.name._text,
        _selected: "false" // item.enabled._text === "true" ? "true" : 
      }))
    }
    finalPay.search.textTypes.textType = 'all' // title | all | ["title","authors", "isbn", "description"];
    return this.apiMethodService({
      url: `/p/users/anonymous/search`,
      method: 'POST',
      body: finalPay,
      options: { responseType: 'text' }
    })
  }

  userLogin(payload: { username: string, password: string }): Observable<any> {
    const { username, password } = payload;
    const base64String = btoa(`${username}:${password}`);
    const headers = new HttpHeaders({
      'Authorization': `Basic ${base64String}`,
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    });
    return this.apiMethodService({
      url: '/createonline/loginUser.do',
      method: 'POST',
      options: { headers },
      body: null
    });
  }
  userLogOut(paris_user_id: string) {
    return this.apiMethodService({
      url: `/users/${paris_user_id}/logout`,
      method: 'GET',
    });
  }


  getCollectionsFilterList() {
    return this.apiMethodService({ url: '/p/collectionsfilter', method: 'GET' })
  }

  getCollectionsList() {
    return this.apiMethodService({ url: '/p/sites/create.mheducation.com/80/createonline?nocacheTimestamp=1734610727137&taxonomyfacets=true&locale=en_US', method: 'GET' })
  }

  getTaxonomyfacetsList() {
    return this.apiMethodService({ url: '/p/taxonomyfacets/create.mheducation.com/80/createonline', method: 'GET' })
  }

  getCoverPhotosList() {
    return this.apiMethodService({ url: '/p/searchcovers', method: 'POST', body: BOOK_COVER_IMAGES })
  }

  getLanguagePropsList() {
    const languageCode = 'en_US'
    return this.apiMethodService({ url: `/locale/${languageCode}/props.json`, method: 'GET' });
  }

  getBookDetails(assetId: string) {
    const url = `/p/assets/${assetId}`;
    const params = {
      type: "metadata",
      recursive: true,
      getrootancestor: true,
      relationships: true,
      supplements: false,
      nocacheTimestamp: Date.now(),
    };
    return this.apiMethodService({
      url,
      method: "GET_PARMS",
      params,
    });

  }
  getBookPageView(payload: any) {
    const userId = this.cookieService.get("paris_user_id");  // Example user ID
    const url = `/users/${userId}/preview/${payload.guid}/${payload.pageNumber}`;
    const headers = new HttpHeaders({
      'jcookie': `JSESSIONID_CRT=ZJ2KJNYkAmHECH3xiK36hc5W9uD7FOL8BAQtanl7mAuQrsCsYnFi!-2070150201`,
      'X-Response-Type': 'arraybuffer',
    });
    const params = {
      nocacheTimestamp: Date.now(),
    };
    return this.apiMethodService({
      url,
      method: "GET_IMAGE",
      options: { headers },
      params,
    });
  }
  getSearchInsideList(payload: any) {
    console.log(payload);
    let user = "anonymous";
    if (!this.isAnonymous()) {
      user = this.cookieService.get("paris_user_id");
    }
    return this.apiMethodService({
      url: `/p/users/${user}/searchinside`,
      method: 'POST',
      body: payload,
      options: { responseType: 'text' }
    })
  }

  apiMethodService<T>({ url, method, body, params = {}, options = {} }: any): Observable<any> {
    url = environment.apiUrl + url;
    if (!options['responseType'] && method !== 'GET_IMAGE') {
      options['responseType'] = 'text';
    }
    if (!options['observe']) {
      options['observe'] = 'response';
    }

    switch (method?.toUpperCase()) {
      case 'GET':
        return this.http.get(url, options);
      case 'GET_PARMS':
        return this.http.get(url, { params: params, ...options });
      case 'GET_IMAGE':
        return this.http.get(url, { params: params, responseType: 'blob', ...options });
      case 'PUT':
        return this.http.put(url, body, options);
      case 'PUT_PARAMS':
        return this.http.put(url, body, { params: params, ...options });
      case 'POST':
        return this.http.post(url, body, options);
      case 'DELETE':
        return this.http.delete(url, options);
      default:
        return this.http.get(url, options);
    }
  }
}
