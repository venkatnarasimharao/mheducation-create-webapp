import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthGuard } from './auth.guard';
import { AuthService } from '../core/services/auth/auth.service';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let modalServiceSpy: jasmine.SpyObj<NgbModal>;

  beforeEach(() => {
    // Create spies for the dependencies
    authServiceSpy = jasmine.createSpyObj('AuthService', ['isLoggedIn']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    modalServiceSpy = jasmine.createSpyObj('NgbModal', ['open']);

    // Configure the testing module
    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: NgbModal, useValue: modalServiceSpy },
      ],
    });

    // Inject the guard
    authGuard = TestBed.inject(AuthGuard);
  });

  it('should allow navigation if user is logged in', () => {
    // Mock the return value of AuthService.isLoggedIn()
    authServiceSpy.isLoggedIn.and.returnValue(true);

    const route = {} as ActivatedRouteSnapshot;
    const state = {} as RouterStateSnapshot;

    // Call the guard's canActivate method
    const result = authGuard.canActivate(route, state);

    expect(result).toBeTrue();
    expect(authServiceSpy.isLoggedIn).toHaveBeenCalled();
  });

  it('should block navigation and open login modal if user is not logged in', () => {
    // Mock the return value of AuthService.isLoggedIn()
    authServiceSpy.isLoggedIn.and.returnValue(false);

    const route = {} as ActivatedRouteSnapshot;
    const state = { url: '/test-url' } as RouterStateSnapshot;

    // Mock the modal's behavior
    const mockModalRef = { componentInstance: {} };
    modalServiceSpy.open.and.returnValue(mockModalRef as any);

    // Call the guard's canActivate method
    const result = authGuard.canActivate(route, state);

    expect(result).toBeFalse();
    expect(authServiceSpy.isLoggedIn).toHaveBeenCalled();
    expect(modalServiceSpy.open).toHaveBeenCalledWith(
      jasmine.any(Function), // Ensure it opens the login component
      { centered: false }
    );
    // expect(mockModalRef.componentInstance.redirectUrl).toBe('/test-url');
  });
});
