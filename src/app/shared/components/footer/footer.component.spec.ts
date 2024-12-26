// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { FooterComponent } from './footer.component';
// import { SharedstateService } from '../../../core/services/shared-state/sharedstate.service';
// import { TranslateService } from '@ngx-translate/core';
// import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
// import { DOCUMENT } from '@angular/common';
// import { of } from 'rxjs';

// describe('FooterComponent', () => {
//   let component: FooterComponent;
//   let fixture: ComponentFixture<FooterComponent>;
//   let sharedstateServiceMock: jasmine.SpyObj<SharedstateService>;
//   let translateServiceMock: jasmine.SpyObj<TranslateService>;
//   let modalServiceMock: jasmine.SpyObj<NgbModal>;
//   let documentMock: Document;

//   beforeEach(async () => {
//     sharedstateServiceMock = jasmine.createSpyObj('SharedstateService', ['getLanguages', 'getLanguagesSignal']);
//     translateServiceMock = jasmine.createSpyObj('TranslateService', ['use', 'get']);
//     modalServiceMock = jasmine.createSpyObj('NgbModal', ['open']);
//     documentMock = document;

//     sharedstateServiceMock.getLanguagesSignal.and.returnValue(() => [{ locale: 'en_US', name: 'English' }]);
//     translateServiceMock.use.and.returnValue(of(null));
//     translateServiceMock.get.and.returnValue(of({ langCode: 'en', textAlign: 'ltr' }));

//     await TestBed.configureTestingModule({
//       imports: [FooterComponent],
//       providers: [
//         { provide: SharedstateService, useValue: sharedstateServiceMock },
//         { provide: TranslateService, useValue: translateServiceMock },
//         { provide: NgbModal, useValue: modalServiceMock },
//         { provide: DOCUMENT, useValue: documentMock },
//       ],
//     }).compileComponents();

//     fixture = TestBed.createComponent(FooterComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should initialize languages on ngOnInit', () => {
//     expect(component.languages).toBeTruthy();
//     expect(sharedstateServiceMock.getLanguagesSignal).toHaveBeenCalled();
//     if (!component.languages()?.length) {
//       expect(sharedstateServiceMock.getLanguages).toHaveBeenCalled();
//     }
//   });

//   it('should handle language change correctly', () => {
//     const lang = 'ar_SA';
//     component.handleLanguageChange(lang);

//     expect(translateServiceMock.use).toHaveBeenCalledWith(lang);
//     translateServiceMock.use(lang).subscribe(() => {
//       expect(translateServiceMock.get).toHaveBeenCalledWith(['langCode', 'textAlign']);
//       translateServiceMock.get(['langCode', 'textAlign']).subscribe(translations => {
//         expect(documentMock.documentElement.lang).toBe(translations.langCode);
//         expect(documentMock.documentElement.dir).toBe(translations.textAlign);
//       });
//     });
//   });

//   it('should open language modal and handle selection', async () => {
//     const modalContent = {};
//     const selectedLanguage = { locale: 'ar_SA' };

//     modalServiceMock.open.and.returnValue({
//       result: Promise.resolve(selectedLanguage),
//     } as any);

//     component.openLanguageModal(modalContent);

//     expect(modalServiceMock.open).toHaveBeenCalledWith(modalContent, { ariaLabelledBy: 'Select Language' });

//     await modalServiceMock.open(modalContent).result;
//     expect(component.modalData.title).toBe('LanguagePopupTitle');
//     expect(component.modalData.items).toEqual(component.languages());
//     expect(sessionStorage.getItem('selectedLanguage')).toBe(selectedLanguage.locale);
//     expect(translateServiceMock.use).toHaveBeenCalledWith(selectedLanguage.locale);
//   });

//   it('should dismiss language modal without selection', async () => {
//     modalServiceMock.open.and.returnValue({
//       result: Promise.reject('Dismissed'),
//     } as any);

//     const modalContent = {};
//     component.openLanguageModal(modalContent);

//     await modalServiceMock.open(modalContent).result.catch(error => {
//       expect(error).toBe('Dismissed');
//     });
//   });

//   it('should open region modal and handle selection', async () => {
//     const modalContent = {};
//     const selectedRegion = { displayValue: 'Asia' };

//     modalServiceMock.open.and.returnValue({
//       result: Promise.resolve(selectedRegion),
//     } as any);

//     component.openRegionModal(modalContent);

//     expect(modalServiceMock.open).toHaveBeenCalledWith(modalContent, { ariaLabelledBy: 'Select Regions' });

//     await modalServiceMock.open(modalContent).result;
//     expect(component.modalData.title).toBe('RegionPopupTitle');
//     expect(component.modalData.items).toEqual(component.regionList);
//     // Verify console log for region selection
//     spyOn(console, 'log');
//     expect(console.log).toHaveBeenCalledWith('Region selected:', selectedRegion);
//   });

//   it('should dismiss region modal without selection', async () => {
//     modalServiceMock.open.and.returnValue({
//       result: Promise.reject('Dismissed'),
//     } as any);

//     const modalContent = {};
//     component.openRegionModal(modalContent);

//     await modalServiceMock.open(modalContent).result.catch(error => {
//       expect(error).toBe('Dismissed');
//     });
//   });

//   it('should open URL in a popup window', () => {
//     spyOn(window, 'open');
//     const url = 'https://example.com';
//     component.openUrl(url);

//     expect(window.open).toHaveBeenCalledWith(url, 'popupWindow', 'width=800,height=600,scrollbars=no,resizable=no');
//   });
// });
