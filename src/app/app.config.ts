import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { TrapFocusDirective } from './trap-focus.directive';
import { HttpClient, provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ApiService } from './services/api.service';
import { httpInterceptor } from './services/http.interceptor';
import { CommonService } from './services/common.service';
import { SharedstateService } from './services/sharedstate.service';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors([httpInterceptor])),
    provideHttpClient(withInterceptorsFromDi()),
    provideHttpClient(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    importProvidersFrom([
      TranslateModule.forRoot({
        loader:{
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
           deps: [HttpClient]

        },
        defaultLanguage:'english',
      })
    ]),
    provideRouter(routes),
    TrapFocusDirective,
    ApiService,
    CommonService,
    SharedstateService,
  ]
};


