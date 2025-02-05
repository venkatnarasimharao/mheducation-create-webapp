import { TestBed } from '@angular/core/testing';
import { AuthGuard } from './auth.guard';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CommonStateService } from '../services/common-state/common-state.service';
import { LoginComponent } from '../../shared/components/login/login.component';

class MockCommonStateService {
  isAnonymous() {
    return true;
  }
}

class MockNgbModal {
  open(content: any, options?: any) {
    return { componentInstance: { redirectUrl: '' } };
  }
}

class MockRouter {
  navigate() { }
}

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let commonStateService: CommonStateService;
  let modalService: NgbModal;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: CommonStateService, useClass: MockCommonStateService },
        { provide: NgbModal, useClass: MockNgbModal },
        { provide: Router, useClass: MockRouter }
      ]
    });

    guard = TestBed.inject(AuthGuard);
    commonStateService = TestBed.inject(CommonStateService);
    modalService = TestBed.inject(NgbModal);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow navigation if user is not anonymous', () => {
    const route = {} as ActivatedRouteSnapshot;
    const state = { url: '/some-path' } as RouterStateSnapshot;

    const canActivate = guard.canActivate(route, state);
    expect(canActivate).toBe(true); // Navigation should be allowed
  });

  it('should block navigation and open the login modal if user is anonymous', () => {
    spyOn(modalService, 'open').and.callThrough();

    const route = {} as ActivatedRouteSnapshot;
    const state = { url: '/some-path' } as RouterStateSnapshot;

    const canActivate = guard.canActivate(route, state);
    expect(canActivate).toBe(false); // Navigation should be blocked
    expect(modalService.open).toHaveBeenCalledWith(LoginComponent, { centered: false }); // Modal should open
  });
});
