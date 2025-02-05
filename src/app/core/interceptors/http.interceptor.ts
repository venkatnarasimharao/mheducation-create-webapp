import { HttpErrorResponse, HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { catchError, map, throwError } from 'rxjs';
import { XmlTransformerUtil } from '../../shared/utils/xml-transformer/xml-transformer.util';
import { CookieService } from 'ngx-cookie-service';
import { inject } from '@angular/core';

export const httpInterceptor: HttpInterceptorFn = (request, next) => {
  const cookieService = inject(CookieService);
  let JSESSIONID_CRT = cookieService.get('JSESSIONID_CRT');
  let transformedReq = request;
  if (JSESSIONID_CRT) {
    transformedReq = transformedReq.clone({
      headers: transformedReq.headers.set(
        'jcookie', `JSESSIONID_CRT=${JSESSIONID_CRT}`
      ),
    });
  }

  if (transformedReq.body && typeof transformedReq.body === 'object') {
    const xmlBody = XmlTransformerUtil.jsonToXml(transformedReq.body);
    transformedReq = transformedReq.clone({
      body: xmlBody,
      headers: transformedReq.headers.set('Content-Type', 'application/xml'),
    });
  }

  return next(transformedReq).pipe(
    map((event: any) => {
      if (event instanceof HttpResponse && event.headers?.get('Content-Type')?.includes('xml')) {
        const xmlString = event.body as string;
        const jsonResponse = XmlTransformerUtil.xmlToJson(xmlString);
        event = event.clone({ body: JSON.stringify(jsonResponse) });
      }
      return event;
    }),
    catchError((error: any) => {
      console.error('HTTP Error:', error);

      if (error instanceof HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
          console.error('Client-side Error:', error.error.message);
        } else {
          console.error(`Server-side Error: ${error.status} - ${error.statusText}`);
        }
      } else {
        console.error('Unknown Error:', error);
      }

      return throwError(() => error);
    })
  );
};
