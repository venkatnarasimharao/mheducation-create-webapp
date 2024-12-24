import { HttpErrorResponse, HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { catchError, map, throwError } from 'rxjs';
import { XmlTransformerUtil } from '../../shared/utils/xml-transformer/xml-transformer.util';

export const httpInterceptor: HttpInterceptorFn = (request, next) => {
  const token = sessionStorage.getItem('token');

  let transformedReq = token
    ? request.clone({
      headers: request.headers.set('Authorization', `Bearer ${token}`),
    })
    : request;

  if (request.body && typeof request.body === 'object') {
    const xmlBody = XmlTransformerUtil.jsonToXml(request.body);
    transformedReq = request.clone({
      body: xmlBody,
      headers: request.headers.set('Content-Type', 'application/xml'),
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
