import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { provideRouter } from '@angular/router';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { MenuSidebarService } from '../../../core/services/menu-sidebar/menuSidebarService.service';
import { Observable, of } from 'rxjs';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

export class MockTranslateLoader implements TranslateLoader {
  getTranslation(lang: string): Observable<any> {
    return of({
      'HEADER': {
        'TITLE': 'Mock Title'
      }
    });
  }
}

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
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
        MenuSidebarService
      ]
    })
      .compileComponents();

    const translate = TestBed.inject(TranslateService);
    translate.setDefaultLang('en_US');
    translate.use('en_US');

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

});