import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { ApiService } from '../api/api.service';
import { CookieService } from 'ngx-cookie-service';
import { of } from 'rxjs';

class MockRouter {
    navigate = jasmine.createSpy('navigate');
}

class MockApiService {
    userLogin = jasmine.createSpy('userLogin').and.returnValue(of({ ok: true, body: '{"paris_user_id": "123", "user_email": "test@example.com", "profile": {"userCountry": "US" }, "jsessionid": "abc123"}' }));
    userLogOut = jasmine.createSpy('userLogOut').and.returnValue(of({}));
}

class MockCookieService {
    set = jasmine.createSpy('set');
    get = jasmine.createSpy('get').and.returnValue('123');
    deleteAll = jasmine.createSpy('deleteAll');
}

describe('AuthService', () => {
    let service: AuthService;
    let apiService: MockApiService;
    let cookieService: MockCookieService;
    let router: MockRouter;

    beforeEach(() => {
        apiService = new MockApiService();
        cookieService = new MockCookieService();
        router = new MockRouter();

        TestBed.configureTestingModule({
            providers: [
                { provide: ApiService, useValue: apiService },
                { provide: CookieService, useValue: cookieService },
                { provide: Router, useValue: router },
            ]
        });

        service = TestBed.inject(AuthService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should call userLogin and update status to success on successful login', () => {
        service.login('test', 'password');
        expect(apiService.userLogin).toHaveBeenCalledWith({ username: 'test', password: 'password' });
        expect(service.loginStatus$).toBeTruthy();
        service.loginStatus$.subscribe(status => {
            expect(status).toBeTruthy();
        });
    });

    it('should handle failed login and update status to failed', () => {
        apiService.userLogin = jasmine.createSpy('userLogin').and.returnValue(of({ ok: false }));
        service.login('test', 'password');
        expect(service.loginStatus$).toBeTruthy();
        service.loginStatus$.subscribe(status => {
            expect(status).toBe('failed');
        });
    });

    it('should manage cookies correctly after successful login', () => {
        service.login('test', 'password');
        expect(cookieService.set).toHaveBeenCalledWith('paris_user_id', '123');
        expect(cookieService.set).toHaveBeenCalledWith('user_email', 'test@example.com');
        expect(cookieService.set).toHaveBeenCalledWith('jsessionid', 'abc123');
        expect(cookieService.set).toHaveBeenCalledWith('userCountry', 'US');
    });

    it('should call userLogOut and navigate to home on logout', () => {
        service.logout();
        expect(apiService.userLogOut).toHaveBeenCalledWith('123');
        expect(cookieService.deleteAll).toHaveBeenCalled();
        expect(router.navigate).toHaveBeenCalledWith(['/']);
    });

    it('should emit LogIn on logout', () => {
        spyOn(service.authStatus, 'emit');
        service.logout();
        expect(service.authStatus.emit).toHaveBeenCalledWith('LogIn');
    });

    it('should return loginError message from getLoginErrorMessage method', () => {
        service.loginError = 'Test error';
        expect(service.getLoginErrorMessage()).toBe('Test error');
    });
});
