import { TestBed } from '@angular/core/testing';

import { SharedstateService } from './sharedstate.service';

describe('SharedstateService', () => {
  let service: SharedstateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedstateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
