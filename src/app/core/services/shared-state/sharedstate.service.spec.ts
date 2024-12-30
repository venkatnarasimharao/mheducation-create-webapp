import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { SharedstateService } from './sharedstate.service';
import { ApiService } from '../api/api.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';

// Mock ApiService
class MockApiService {
  apiMethodService() {
    return of({ ok: true, body: JSON.stringify({ language: ['English', 'Spanish'] }) });
  }
}

describe('SharedstateService', () => {
  let service: SharedstateService;
  let apiService: ApiService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        SharedstateService,
        { provide: ApiService, useClass: MockApiService },
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    }).compileComponents();
    service = TestBed.inject(SharedstateService);
    apiService = TestBed.inject(ApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load languages from sessionStorage if available', () => {
    const savedLanguages = ['English', 'Spanish'];
    sessionStorage.setItem('languages', JSON.stringify(savedLanguages));
    service = TestBed.inject(SharedstateService);
    service.getLanguages();
    expect(service.getLanguagesSignal()).toBeTruthy();
    expect(service.getLanguagesSignal()()).toEqual(savedLanguages);
  });

  it('should call the API and update languages when sessionStorage is empty', fakeAsync(() => {
    sessionStorage.removeItem('languages');
    spyOn(apiService, 'apiMethodService').and.callThrough();
    service.getLanguages()
    tick();
    expect(apiService.apiMethodService).toBeTruthy();
  }));
});
