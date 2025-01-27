import { TestBed } from '@angular/core/testing';

import { CommonStateService } from './common-state.service';

describe('CommonStateService', () => {
  let service: CommonStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommonStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
