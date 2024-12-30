import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TranslateModule, TranslateService, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';  // Import TranslateHttpLoader
import { HttpClient, provideHttpClient } from '@angular/common/http';  // Import HttpClient for the loader factory
import { ApiService } from './core/services/api/api.service';
import { SharedstateService } from './core/services/shared-state/sharedstate.service';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppComponent,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]  // Provide the HttpClient to the loader factory
          },
          defaultLanguage: 'en_US',
        }),
      ],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        ApiService,
        SharedstateService,
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
