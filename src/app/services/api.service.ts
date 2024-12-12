import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, from, map, Observable, switchMap, tap, throwError } from 'rxjs';
import { USER_SEARCH_CONFIG } from '../config/search-payload.config';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private commonService: CommonService) { }

  getSearchListing() {
    const finalPay = USER_SEARCH_CONFIG
    finalPay.search.textTypes.textType = 'all' // title | all | ["title","authors", "isbn", ""];
    return this.commonService.apiMethodService({
      url: `/p/users/anonymous/search`,
      method: 'POST',
      body: JSON.stringify(finalPay)
    }).pipe(
      switchMap((response: string) => {
        console.error('processing response:', response);
        if (response.startsWith('<?xml')) {
          return from(this.commonService.xmlToJson(response));
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
    return this.commonService.apiMethodService({
      url: '/loginUser.do', method: 'POST', headers: {
        headers: new HttpHeaders({
          'Authorization': 'Basic S2FydGhpa2luczFAbWhlcWEuY29tOlB3ZEAxMjM0',
        })
      }
    });
  }


  getCollectionsList() {
    return this.commonService.apiMethodService({ url: '/p/collectionsfilter', method: 'GET' }).pipe(
      switchMap((response: string) => {
        if (response.startsWith('<?xml')) {
          return from(this.commonService.xmlToJson(response));
        } else {
          throw new Error('Unexpected response format');
        }
      }),
      catchError((error: any) => {
        return throwError(() => error);
      })
    );
  }
}
