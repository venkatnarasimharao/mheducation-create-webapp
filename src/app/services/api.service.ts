import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, from, map, Observable, switchMap, tap, throwError } from 'rxjs';
import { json2xml, xml2json } from 'xml-js'
import { environment } from '../../environments/environment';
import { USER_SEARCH_CONFIG } from '../config/search-payload.config';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getSearchListing() {
    const finalPay = USER_SEARCH_CONFIG
    return this.apiMethodService({
      url: `/p/users/anonymous/search`,
      method: 'POST',
      body: finalPay
    }).pipe(
      switchMap((response: string) => {
        console.error('processing response:', response);
        if (response.startsWith('<?xml')) {
          return from(this.xmlToJson(response));
        } else {
          throw new Error('Unexpected response format');
        }
      }),
      catchError((error: any) => {
        console.error('Error processing response:', error);
        return throwError(() => error);
      })
    );
  }

  userLogin() {
    return this.apiMethodService({
      url: '/loginUser.do', method: 'POST', headers: {
        headers: new HttpHeaders({
          'Authorization': 'Basic S2FydGhpa2luczFAbWhlcWEuY29tOlB3ZEAxMjM0',
        })
      }
    });
  }

  async xmlToJson(xml: string) {
    try {
      return JSON.parse(xml2json(xml, { compact: true, spaces: 2 }));
    } catch (error) {
      console.error('Error parsing XML:', error);
      throw new Error('Failed to parse XML');
    }
  }

  apiMethodService<T>({ url, method, body, params, headers }: any): Observable<any> {
    url = environment.apiUrl + url;

    switch (method?.toUpperCase()) {
      case 'LOGIN':
        return this.http.post<any>(url, body)
      case 'POST':
        return this.http.post<any>(url, body, headers)
      case 'DELETE':
        return this.http.delete<any>(url)
      case 'GET_PARMS':
        return this.http.get<any>(url, { params: params })
      case 'PUT_PARAMS':
        return this.http.put<any>(url, body, { params: params })
      case 'PUT':
        return this.http.put<any>(url, body)
      case 'GET_IMAGE':
        return this.http.get<any>(url, { responseType: 'blob' as 'json' })
      case 'GET':
        return this.http.get<any>(url, { responseType: 'text' as 'json' })
      default:
        return this.http.get<any>(url)
    }
  }
}
