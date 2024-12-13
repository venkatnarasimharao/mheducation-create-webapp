import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, from, map, Observable, switchMap, tap, throwError } from 'rxjs';
import { BOOK_COVER_IMAGES, USER_SEARCH_CONFIG } from '../config/search-payload.config';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private commonService: CommonService) { }

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
    finalPay.search.textTypes.textType = 'title' // title | all | ["title","authors", "isbn", ""];
    return this.commonService.apiMethodService({
      url: `/p/users/anonymous/search`,
      method: 'POST',
      body: JSON.stringify(finalPay)
    }).pipe(
      switchMap((response: string) => {
        console.error('processing response:', response);
        if (response.startsWith('<?xml')) {
          return from(this.commonService.convertXmlToJson(response));
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
          return from(this.commonService.convertXmlToJson(response));
        } else {
          throw new Error('Unexpected response format');
        }
      }),
      catchError((error: any) => {
        return throwError(() => error);
      })
    );
  }

  getTaxonomyfacetsList() {
    return this.commonService.apiMethodService({ url: '/p/taxonomyfacets/create.mheducation.com/80/createonline', method: 'GET' }).pipe(
      switchMap((response: string) => {
        return from(this.commonService.convertXmlToJson(response));
      }),
      catchError((error: any) => {
        return throwError(() => error);
      })
    );
  }

  getCoverPhotosList() {
    const body = this.commonService.JsonToXml(BOOK_COVER_IMAGES)
    this.commonService.JsonToXml(BOOK_COVER_IMAGES).then((xml:any) => console.log('Generated XML:', xml))
      .catch((error:any) => console.error('Error:', error));
    // console.log(body, 'check this out')
    return this.commonService.apiMethodService({ url: '/p/searchcovers', method: 'POST', body }).pipe(
      switchMap((response: string) => {
        return from(this.commonService.convertXmlToJson(response));
      }),
      catchError((error: any) => {
        return throwError(() => error);
      })
    );
  }

  getLanguagePropsList() {
    const languageCode = 'en_US'
    return this.commonService.apiMethodService({ url: `/locale/${languageCode}/props.json`, method: 'GET' });
  }
}
