import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../../core/services/auth/auth.service';
import { LoginComponent } from './login.component';
import { Subject } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mockAuthService: any;
  let mockRouter: any;
  let mockActiveModal: any;

  beforeEach(async () => {
    mockAuthService = {
      login: jasmine.createSpy('login'),
      loginStatus$: new Subject<string>(),
      getLoginErrorMessage: jasmine.createSpy('getLoginErrorMessage').and.returnValue('Invalid username or password')
    };

    mockRouter = {
      navigate: jasmine.createSpy('navigate')
    };

    mockActiveModal = {
      close: jasmine.createSpy('close')
    };

    await TestBed.configureTestingModule({
      imports: [LoginComponent],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter },
        { provide: NgbActiveModal, useValue: mockActiveModal }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize default form values', () => {
    expect(component.form.username).toBe('');
    expect(component.form.password).toBe('');
    expect(component.passwordFieldType).toBe('password');
    expect(component.loaderActive).toBe(false);
    expect(component.loginError).toBe('');
  });

  it('should toggle password visibility', () => {
    expect(component.passwordFieldType).toBe('password');
    component.togglePasswordVisibility();
    expect(component.passwordFieldType).toBe('text');
    component.togglePasswordVisibility();
    expect(component.passwordFieldType).toBe('password');
  });

  it('should set loginError on onForgotPassword call', () => {
    component.onForgotPassword();
    expect(component.loginError).toBe('not integrated at this time');
  });

  it('should call AuthService login on form submission', () => {
    component.form = { username: 'testUser', password: 'testPassword' };
    const fakeForm = { valid: true } as NgForm;

    component.onSubmit(fakeForm);

    expect(mockAuthService.login).toHaveBeenCalledWith('testUser', 'testPassword');
  });

  it('should handle loginStatus$ as pending', () => {
    component.form = { username: 'testUser', password: 'testPassword' };
    const fakeForm = { valid: true } as NgForm;

    component.onSubmit(fakeForm);
    mockAuthService.loginStatus$.next('pending');

    expect(component.loaderActive).toBe(true);
  });

  it('should handle loginStatus$ as success', () => {
    component.redirectUrl = '/dashboard';
    const fakeForm = { valid: true } as NgForm;

    component.onSubmit(fakeForm);
    mockAuthService.loginStatus$.next('success');

    expect(component.loaderActive).toBe(false);
    expect(mockActiveModal.close).toHaveBeenCalled();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/dashboard']);
  });

  it('should handle loginStatus$ as failed', () => {
    const fakeForm = { valid: true } as NgForm;

    component.onSubmit(fakeForm);
    mockAuthService.loginStatus$.next('failed');

    expect(component.loaderActive).toBe(false);
    expect(component.loginError).toBe('Invalid username or password');
    expect(mockAuthService.getLoginErrorMessage).toHaveBeenCalled();
  });

  it('should not call AuthService login if form is invalid', () => {
    const fakeForm = { valid: false } as NgForm;

    component.onSubmit(fakeForm);

    expect(mockAuthService.login).not.toHaveBeenCalled();
  });
});
