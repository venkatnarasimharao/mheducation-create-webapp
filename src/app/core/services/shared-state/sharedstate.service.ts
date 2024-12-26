import { Injectable, signal } from '@angular/core';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class SharedstateService {
  private languages = signal<string[] | null>(null);

  constructor(
    private apiService: ApiService
  ) {
    const savedLanguages = sessionStorage.getItem('languages');
    if (savedLanguages) {
      this.languages.set(JSON.parse(savedLanguages));
    }
  }

  getLanguages() {
    if (this.languages()) {
      return;
    }

    this.apiService.apiMethodService({ url: '/p/languages', method: 'GET' }).subscribe({
      next: (res: any) => {
        const languages = res.body ? JSON.parse(res.body) : {}
        if (res.ok && languages?.language) {
          this.languages.set(languages.language)
          sessionStorage.setItem('languages', JSON.stringify(languages.language))
        }
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
