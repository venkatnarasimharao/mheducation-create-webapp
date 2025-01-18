import { TestBed } from '@angular/core/testing';
import { AuthGuard } from './auth.guard';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from '../../shared/components/login/login.component';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

class MockAuthService {
  isAnonymous() {
    return true;
  }
}

class MockNgbModal {
  open(content: any, options?: any) {
    return { componentInstance: { redirectUrl: '' } };
  }
}

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let authService: AuthService;
  let modalService: NgbModal;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        AuthGuard,
        { provide: AuthService, useClass: MockAuthService },
        { provide: NgbModal, useClass: MockNgbModal }
      ]
    });
    guard = TestBed.inject(AuthGuard);
    authService = TestBed.inject(AuthService);
    modalService = TestBed.inject(NgbModal);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow navigation if user is not anonymous', () => {
    spyOn(authService, 'isAnonymous').and.returnValue(false);
    const route = {} as ActivatedRouteSnapshot;
    const state = { url: '/some-path' } as RouterStateSnapshot;
    const canActivate = guard.canActivate(route, state);
    expect(canActivate).toBe(true);
  });

  it('should block navigation and open the login modal if user is anonymous', () => {
    spyOn(authService, 'isAnonymous').and.returnValue(true);
    spyOn(modalService, 'open').and.callThrough();
    const route = {} as ActivatedRouteSnapshot;
    const state = { url: '/some-path' } as RouterStateSnapshot;
    const canActivate = guard.canActivate(route, state);
    expect(canActivate).toBe(false);
    expect(modalService.open).toHaveBeenCalledWith(LoginComponent, { centered: false });
    const modalInstance = modalService.open(LoginComponent, { centered: false }).componentInstance;
  });
});
