import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
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
  ) {
  }
  session = 'JSESSIONID_CRT=55GSVpuBmOQ9QGgkIP7L9DJHiUFUQKo1SJbB5cFXlx7Xs1ic54fK!-2070150201'
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

  getProjectList(): Observable<any> {
  const cookie = this.cookieService.get('jsessionid');
  const uid = this.cookieService.get('paris_user_id');
  const headers = new HttpHeaders({
    'jcookie': this.session
  });

  return this.apiMethodService({
    url: `/users/${uid}/listprojects?nocacheTimestamp=1737022264852&state=active`,
    method: 'GET',
    options: { headers }
  })
}
  getProjectData(projectId: string): Observable<any> {
    const cookie = this.cookieService.get('jsessionid');
    const paris_user_id = this.cookieService.get('paris_user_id');
    const headers = new HttpHeaders({
      'jcookie':this.session
    });
 
    return this.apiMethodService({
      url: `/p/users/${paris_user_id}/projects/${projectId}`,
      options: { headers },
      method: 'GET',
    })
  }


  saveProjectData(projectId: string, payload: any): Observable<any> {
    const cookie = this.cookieService.get('jsessionid');
    const paris_user_id = this.cookieService.get('paris_user_id');
    const headers = new HttpHeaders({
      'jcookie': this.session
    });
    
    return this.apiMethodService({
      url: `/users/${paris_user_id}/saveproject/${projectId};jsessionid=Gj6NvVUVcSIMGkSqJ4bVcXNP0lOtJp5azb9QwKx5AVUMN3OBR3iM!-2070150201!1737544783125?returnpricing=false`,
      method: 'POST',
      body: payload,
      options: {headers}
    })
  }
  getProjectPricing(projectId:any): Observable<any> {
    const cookie = this.cookieService.get('jsessionid');
    const paris_user_id = this.cookieService.get('paris_user_id');
    const headers = new HttpHeaders({
      'jcookie': this.session
    });
    return this.apiMethodService({
      url: `/users/${paris_user_id}/getprojectpricing/${projectId}`,
      method: 'GET',
      body: null,
      options: {headers}
    })
  }

  apiMethodService<T>({ url, method, body, params = {}, options = {} }: any): Observable<any> {
    url = environment.apiUrl + url;
    options = {
      responseType: 'text',
      observe: 'response',
      ...options
    };
    console.log(options, '111111111111111')

    switch (method?.toUpperCase()) {
      case 'GET':
        return this.http.get(url, options);
      case 'GET_PARMS':
        return this.http.get(url, { params: params, ...options });
      case 'GET_IMAGE':
        return this.http.get(url, { responseType: 'blob' as 'json', ...options });
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
