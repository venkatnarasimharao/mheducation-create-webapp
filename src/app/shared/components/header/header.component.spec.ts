import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { provideRouter } from '@angular/router';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { MenuSidebarService } from '../../../core/services/menu-sidebar/menuSidebarService.service';
import { Observable, of, Subject } from 'rxjs';
import { NgbDropdownModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { AuthService } from '../../../core/services/auth/auth.service';
import { LoginComponent } from '../login/login.component';
import { CommonStateService } from '../../../core/services/common-state/common-state.service';

export class MockTranslateLoader implements TranslateLoader {
  getTranslation(lang: string): Observable<any> {
    return of({
      'HEADER': {
        'TITLE': 'Mock Title'
      }
    });
  }
}

class MockAuthService {
  authStatus = new Subject<string>();
  logout() {
    // Mock logout implementation
  }
}


describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let mockAuthService: MockAuthService;
  let modalService: NgbModal;
  let mockCommonStateService: jasmine.SpyObj<CommonStateService>;


  beforeEach(async () => {
    mockAuthService = new MockAuthService();
    mockCommonStateService = jasmine.createSpyObj('CommonStateService', ['isAnonymous', 'getUserId']);
    mockCommonStateService.isAnonymous.and.returnValue(true);
    mockCommonStateService.getUserId.and.returnValue('123');

    await TestBed.configureTestingModule({
      imports: [
        HeaderComponent,
        NgbDropdownModule,
        TranslateModule.forRoot({
          defaultLanguage: 'en_US',
          loader: {
            provide: TranslateLoader,
            useClass: MockTranslateLoader,
            deps: []
          }
        })
      ],
      providers: [
        provideRouter([]),
        MenuSidebarService,
        provideHttpClientTesting(),
        { provide: AuthService, useValue: mockAuthService }, // Mock AuthService
        { provide: CommonStateService, useValue: mockCommonStateService },
        NgbModal,
      ]
    }).compileComponents();

    const translate = TestBed.inject(TranslateService);
    translate.setDefaultLang('en_US');
    translate.use('en_US');

    modalService = TestBed.inject(NgbModal);

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call requestOpenMenu when openMenu is called', () => {
    const menuService = TestBed.inject(MenuSidebarService);
    spyOn(menuService, 'requestOpenMenu');

    component.openMenu();
    expect(menuService.requestOpenMenu).toHaveBeenCalled();
  });

  it('should set loggedInStatus to "LogOut" when user is not anonymous in ngOnInit', () => {
    spyOn(mockCommonStateService, 'isAnonymous').and.returnValue(false);
    mockAuthService.authStatus.next('LogOut');

    component.ngOnInit();
    expect(component.loggedInStatus).toBe('LogOut');
  });

  it('should set loggedInStatus to the emitted value from AuthService.authStatus', () => {
    mockAuthService.authStatus.next('LogIn');
    expect(component.loggedInStatus).toBe('LogIn');
  });

  it('should call AuthService.logout when loggedInStatus is "LogOut" and changeLoginStatus is called', () => {
    spyOn(mockAuthService, 'logout');
    component.loggedInStatus = 'LogOut';

    component.changeLoginStatus();
    expect(mockAuthService.logout).toHaveBeenCalled();
  });

  it('should open the login modal when loggedInStatus is not "LogOut" and changeLoginStatus is called', () => {
    spyOn(modalService, 'open');
    component.loggedInStatus = 'LogIn';

    component.changeLoginStatus();
    expect(modalService.open).toHaveBeenCalledWith(LoginComponent, { centered: false });
  });
});
