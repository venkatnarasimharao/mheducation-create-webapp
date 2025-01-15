import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BOOK_COVER_IMAGES, USER_SEARCH_CONFIG } from '../../../shared/constants/search-payload.config';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  subscribe(arg0: () => void) {
    throw new Error('Method not implemented.');
  }

  constructor(
    private http: HttpClient,
  ) { }

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

  getBookDetails() {
    const assetId = "9b0c36ca-a185-3030-9604-78a96198afee";
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
  getBookPageView() {
    // https://createqa.mheducation.com/createonline/users/1000507376/preview/321660fb-ec46-32a6-8e05-f088b0331fb4/1?nocacheTimestamp=1736928511658
    const userId = "1000507376";  // Example user ID
    const assetId = "321660fb-ec46-32a6-8e05-f088b0331fb4";
    const pageNumber = 1;
    const url = `/users/${userId}/preview/${assetId}/${pageNumber}`;
    const params = {
      nocacheTimestamp: Date.now(),
    };
    return this.apiMethodService({
      url,
      method: "GET_PARMS",
      params,
    });
  }

  apiMethodService<T>({ url, method, body, params = {}, options = {} }: any): Observable<any> {
    url = environment.apiUrl + url;
    if (!options['responseType']) {
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
