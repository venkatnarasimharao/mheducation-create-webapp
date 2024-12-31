import { TestBed } from '@angular/core/testing';
import { HttpClient, HTTP_INTERCEPTORS, HttpErrorResponse, provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { httpInterceptor } from './http.interceptor';
import { XmlTransformerUtil } from '../../shared/utils/xml-transformer/xml-transformer.util';

describe('httpInterceptor', () => {
  let http: HttpClient;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        {
          provide: HTTP_INTERCEPTORS,
          useValue: httpInterceptor,
          multi: true,
        },
      ],
    });

    http = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
    sessionStorage.clear();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(httpInterceptor).toBeTruthy();
  })  

  it('should not add Authorization header if token is absent', () => {
    http.get('/test').subscribe();

    const req = httpMock.expectOne('/test');
    expect(req.request.headers.has('Authorization')).toBeFalse();
  });
});
