import { CommonStateService } from './../common-state/common-state.service';
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
    userLogin = jasmine
        .createSpy('userLogin')
        .and.returnValue(
            of({
                ok: true,
                body: '{"paris_user_id": "123", "user_email": "test@example.com", "profile": {"userCountry": "US", "roles": ["admin"], "firstName": "John", "lastName": "Doe" }, "jsessionid": "abc123"}',
            })
        );

    userLogOut = jasmine
        .createSpy('userLogOut')
        .and.returnValue(of({ ok: true }));
}

class MockCookieService {
    private storage: { [key: string]: string } = {
        paris_user_id: '123',
    };

    set = jasmine.createSpy('set').and.callFake((key: string, value: string) => {
        this.storage[key] = value;
    });

    get = jasmine.createSpy('get').and.callFake((key: string) => this.storage[key] || '');

    deleteAll = jasmine.createSpy('deleteAll').and.callFake(() => {
        this.storage = {};
    });
}

describe('AuthService', () => {
    let service: AuthService;
    let commonStateService: CommonStateService;
    let apiService: MockApiService;
    let cookieService: MockCookieService;
    let router: MockRouter;

    beforeEach(() => {
        apiService = new MockApiService();
        cookieService = new MockCookieService();
        router = new MockRouter();

        TestBed.configureTestingModule({
            providers: [
                AuthService,
                { provide: ApiService, useValue: apiService },
                { provide: CookieService, useValue: cookieService },
                { provide: Router, useValue: router },
            ],
        });

        service = TestBed.inject(AuthService);
        commonStateService = TestBed.inject(CommonStateService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should call userLogin and update status to success on successful login', (done) => {
        service.login('test', 'password');
        expect(apiService.userLogin).toHaveBeenCalledWith({ username: 'test', password: 'password' });

        service.loginStatus$.subscribe((loginStatus) => {
            expect(loginStatus).toBe('success');
            done();
        });
    });

    it('should handle failed login and update status to failed', (done) => {
        apiService.userLogin = jasmine
            .createSpy('userLogin')
            .and.returnValue(of({ ok: false }));

        service.login('test', 'password');

        service.loginStatus$.subscribe((loginStatus) => {
            expect(loginStatus).toBe('failed');
            done();
        });
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
