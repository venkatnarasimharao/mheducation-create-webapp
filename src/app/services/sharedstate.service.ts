import { Injectable, signal } from '@angular/core';
import { catchError, from, map, Observable, switchMap, tap, throwError } from 'rxjs';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class SharedstateService {
  private languages = signal<string[] | null>(null);

  constructor(private commonService: CommonService) {
    const savedLanguages = sessionStorage.getItem('languages');
    if (savedLanguages) {
      this.languages.set(JSON.parse(savedLanguages));
    }
  }

  getLanguages() {
    if (this.languages()) {
      return;
    }

    this.commonService.apiMethodService({ url: '/p/languages', method: 'GET' }).pipe(
      switchMap((response: string) => {
        if (response.startsWith('<?xml')) {
          return from(this.commonService.convertXmlToJson(response))
        } else {
          throw new Error('Unexpected response format');
        }
      }),
      catchError((error: any) => {
        console.error('Error fetching languages:', error);
        return throwError(() => error);
      })
    )
      .subscribe({
        next: (languages: any) => {
          const langList = languages['language-configuration']?.language
          this.languages.set(langList)
          sessionStorage.setItem('languages', JSON.stringify(langList))
        },
        error: (error: any) => {
          console.error('Error in subscription:', error);
        },
      });
  }


  getLanguagesSignal() {
    return this.languages;
  }
}
