import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SidebarComponent } from './sidebar.component';
import { provideRouter } from '@angular/router';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Observable, of } from 'rxjs';
import { MenuSidebarService } from '../../../core/services/menu-sidebar/menuSidebarService.service';

// Mock Translate Loader
export class MockTranslateLoader implements TranslateLoader {
  getTranslation(lang: string): Observable<any> {
    return of({
      'FindContent': 'Find Content',
      'Projects': 'Projects',
    });
  }
}

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;
  let offcanvasService: NgbOffcanvas;
  let menuService: MenuSidebarService;
  let breakpointObserver: jasmine.SpyObj<BreakpointObserver>;

  beforeEach(async () => {
    // Create spy object for BreakpointObserver
    const breakpointSpy = jasmine.createSpyObj('BreakpointObserver', ['observe']);
    breakpointSpy.observe.and.returnValue(of({ matches: true } as BreakpointState));

    await TestBed.configureTestingModule({
      imports: [
        SidebarComponent,
        TranslateModule.forRoot({
          defaultLanguage: 'en',
          loader: {
            provide: TranslateLoader,
            useClass: MockTranslateLoader,
            deps: []
          }
        })
      ],
      providers: [
        provideRouter([]),
        NgbOffcanvas,
        MenuSidebarService,
        { provide: BreakpointObserver, useValue: breakpointSpy }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    offcanvasService = TestBed.inject(NgbOffcanvas);
    menuService = TestBed.inject(MenuSidebarService);
    breakpointObserver = TestBed.inject(BreakpointObserver) as jasmine.SpyObj<BreakpointObserver>;

    // Initialize translate service
    const translate = TestBed.inject(TranslateService);
    translate.setDefaultLang('en');
    translate.use('en');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open offcanvas when open() is called', () => {
    spyOn(offcanvasService, 'open');
    component.open();
    expect(offcanvasService.open).toHaveBeenCalled();
  });

  it('should dismiss offcanvas when openMenu() is called', () => {
    spyOn(offcanvasService, 'dismiss');
    component.openMenu();
    expect(offcanvasService.dismiss).toHaveBeenCalled();
  });

  it('should handle breakpoint changes correctly', () => {
    spyOn(offcanvasService, 'dismiss');
    component.ngOnInit();
    expect(breakpointObserver.observe).toHaveBeenCalledWith(['(min-width: 992px)']);
    expect(offcanvasService.dismiss).toHaveBeenCalled();
  });

  it('should handle menu service requests', () => {
    spyOn(component, 'open');
    menuService.requestOpenMenu();
    expect(component.open).toHaveBeenCalled();
  });

  it('should have correct menu items', () => {
    expect(component.menuItems.length).toBe(7);
    expect(component.menuItems[0].label).toBe('FindContent');
    expect(component.menuItems[0].path).toBe('search-content');
  });
});