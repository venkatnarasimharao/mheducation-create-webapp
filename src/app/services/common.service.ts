import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { json2xml, xml2json } from 'xml-js'

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http: HttpClient) { }

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