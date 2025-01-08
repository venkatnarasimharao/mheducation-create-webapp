import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { HttpClient, provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { httpInterceptor } from './core/interceptors/http.interceptor';
import { ApiService } from './core/services/api/api.service';
import { SharedstateService } from './core/services/shared-state/sharedstate.service';
import { CookieService } from 'ng2-cookies';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
export const appConfig: ApplicationConfig = {
  providers: [
    CookieService,
    provideHttpClient(withInterceptors([httpInterceptor])),
    provideHttpClient(withInterceptorsFromDi()),
    provideHttpClient(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    importProvidersFrom([
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]

        },
        defaultLanguage: 'en_US',
      })
    ]),
    provideRouter(routes),
    ApiService,
    SharedstateService,
  ]
};


