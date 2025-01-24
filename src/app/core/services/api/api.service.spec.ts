import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { ApiService } from './api.service';
import { provideHttpClient } from '@angular/common/http';
import { BOOK_COVER_IMAGES, USER_SEARCH_CONFIG } from '../../../shared/constants/search-payload.config';
import { environment } from '../../../../environments/environment';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        ApiService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    }).compileComponents();
    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call getSearchListing and return response', () => {
    const mockResponse = { data: 'mock data' };
  
    // Create a mock finalPayload object (you can customize it based on the actual payload structure expected by the method)
    const finalPayload = { query: 'test query', textType: ['type1'], findable: true };
  
    // Spy on sessionStorage to return mock data
    spyOn(sessionStorage, 'getItem').and.returnValue(JSON.stringify([{ displayValue: { _text: 'English' }, name: { _text: 'en' }, enabled: { _text: 'true' } }]));
  
    // Call getSearchListing with the finalPayload parameter
    service.getSearchListing(finalPayload).subscribe(response => {
      expect(response.body).toEqual(mockResponse);  // Expect response body to be equal to mockResponse
    });
  
    // Mock the HTTP request
    const req = httpMock.expectOne(`${environment.apiUrl}/p/users/anonymous/search`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(USER_SEARCH_CONFIG);  // Ensure correct body is sent
    req.flush(mockResponse);  // Return the mock response
  });
  

  xit('should call userLogin and return response', () => {
    const mockResponse = { message: 'Login successful' };
    service.userLogin({ username: '', password: '' }).subscribe(response => {
      expect(response.body).toEqual(JSON.stringify(mockResponse));
    });
    const req = httpMock.expectOne(`${environment.apiUrl}/loginUser.do`);
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.has('Authorization')).toBeFalsy();
    req.flush(mockResponse);
  });
  xit('should call getCollectionsList and return response', () => {
    const mockResponse = { collections: ['collection1', 'collection2'] };
    service.getCollectionsList().subscribe(response => {
      expect(response.body).toEqual(JSON.stringify(mockResponse))
    });
    const req = httpMock.expectOne(`${environment.apiUrl}/p/collectionsfilter`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should call getTaxonomyfacetsList and return response', () => {
    const mockResponse = { facets: ['facet1', 'facet2'] };
    service.getTaxonomyfacetsList().subscribe(response => {
      expect(response.body).toEqual(JSON.stringify(mockResponse));
    });
    const req = httpMock.expectOne(`${environment.apiUrl}/p/taxonomyfacets/create.mheducation.com/80/createonline`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should call getCoverPhotosList and return response', () => {
    const mockResponse = { images: ['image1', 'image2'] };
    service.getCoverPhotosList().subscribe(response => {
      expect(response.body).toEqual(JSON.stringify(mockResponse))
    });
    const req = httpMock.expectOne(`${environment.apiUrl}/p/searchcovers`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(BOOK_COVER_IMAGES)
    req.flush(mockResponse);
  });
  it('should call getLanguagePropsList and return response', () => {
    const mockResponse = { language: 'en_US' };
    service.getLanguagePropsList().subscribe(response => {
      expect(response.body).toBe(JSON.stringify(mockResponse));
    });
    const req = httpMock.expectOne(`${environment.apiUrl}/locale/en_US/props.json`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse)
  });
});
