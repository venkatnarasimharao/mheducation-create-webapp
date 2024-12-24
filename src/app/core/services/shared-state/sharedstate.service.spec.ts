import { TestBed } from '@angular/core/testing';

import { SharedstateService } from './sharedstate.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('SharedstateService', () => {
  let service: SharedstateService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        SharedstateService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    }).compileComponents();
    service = TestBed.inject(SharedstateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
