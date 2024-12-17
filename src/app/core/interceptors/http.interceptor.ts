import { HttpErrorResponse, HttpHeaders, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const httpInterceptor: HttpInterceptorFn = (request, next) => {
  const token = sessionStorage.getItem('token');
  if (!token) {
    return next(request);
  }

  let req = request.clone({
    headers: new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    })
  })

  return next(req).pipe(
    catchError((error: any) => {
      console.error(error);
      if (error instanceof HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
          console.error("Error Event");
        } else {
          console.log(`error status : ${error.status} ${error.statusText}`);
          switch (error.status) {
            case 401: {
              window.location.href = '/'
              sessionStorage.clear();
              break;
            }
            case 403: {
              sessionStorage.clear();
              window.location.href = '/'
              break;
            }
          }
        }
      } else {
        console.error("some thing else happened");
      }
      return throwError(error)
    })
  )
};
