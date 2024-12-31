import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FooterComponent } from "./footer.component";
import { SharedstateService } from "../../../core/services/shared-state/sharedstate.service";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { TranslateLoader, TranslateModule, TranslateService } from "@ngx-translate/core";
import { signal } from "@angular/core";
import { MockTranslateLoader } from "../header/header.component.spec";
import { provideHttpClient } from "@angular/common/http";
import { of } from "rxjs";
import { provideHttpClientTesting } from "@angular/common/http/testing";

describe('FooterComponent', () => {
    let component: FooterComponent;
    let fixture: ComponentFixture<FooterComponent>;
    let mockSharedstateService: jasmine.SpyObj<SharedstateService>;
    let modalService: jasmine.SpyObj<NgbModal>;
    let translateService: TranslateService;
    let documentMock: Document;

    beforeEach(async () => {
        mockSharedstateService = jasmine.createSpyObj('SharedstateService', ['getLanguagesSignal', 'getLanguages']);
        const mockLanguagesSignal = signal(['en_US', 'it_IT', 'ar_SA']);
        mockSharedstateService.getLanguagesSignal.and.returnValue(mockLanguagesSignal);

        documentMock = {
            documentElement: {
                lang: 'ar_SA',
                dir: 'rtl'
            }
        } as any;

        modalService = jasmine.createSpyObj('NgbModal', ['open']);

        await TestBed.configureTestingModule({
            imports: [
                TranslateModule.forRoot({
                    loader: {
                        provide: TranslateLoader,
                        useClass: MockTranslateLoader,
                    },
                }),
                FooterComponent,
            ],
            providers: [
                provideHttpClient(),
                provideHttpClientTesting(),
                TranslateService,
                { provide: NgbModal, useValue: modalService },
                { provide: SharedstateService, useValue: mockSharedstateService },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(FooterComponent);
        component = fixture.componentInstance;
        translateService = TestBed.inject(TranslateService);
        fixture.detectChanges();

    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });



    it('should not call getLanguages when languages are already present in ngOnInit', () => {
        mockSharedstateService.getLanguagesSignal.and.returnValue(signal(['en_US', 'it_IT']));

        component.ngOnInit();

        expect(mockSharedstateService.getLanguages).not.toHaveBeenCalled();
    });

    it('should initialize languages from the sharedstate service', () => {
        expect(mockSharedstateService.getLanguagesSignal).toHaveBeenCalled();
        expect(component.languages()).toEqual(['en_US', 'it_IT', 'ar_SA']);
    });
    it('should call handleLanguageChange when a language is selected in the modal', async () => {
        const content = {}; // Mock content
        const selectedItem = { locale: 'en_US', displayValue: 'English' };

        spyOn(component, 'handleLanguageChange');
        const mockModalRef = {
            result: Promise.resolve(selectedItem),
            componentInstance: {},
        } as unknown as NgbModalRef;

        modalService.open.and.returnValue(mockModalRef);
        component.openLanguageModal(content);
        await mockModalRef.result;
        expect(component.handleLanguageChange).toHaveBeenCalledWith(selectedItem.locale);
        expect(sessionStorage.getItem('selectedLanguage')).toBe(selectedItem.locale);
    });

    it('should open the language modal with the correct title and items', () => {
        const content = {};

        // Mock data for languages
        component.languages = () => [
            { locale: 'en_US', displayValue: 'English' },
            { locale: 'it_IT', displayValue: 'Italian' },
            { locale: 'ar_SA', displayValue: 'Arabic' },
        ];

        // Mock the modal service
        const mockModalRef = {
            result: Promise.resolve(), // Mock result as a resolved Promise
            componentInstance: {}, // Add any additional properties as required
        } as unknown as NgbModalRef;

        modalService.open.and.returnValue(mockModalRef);

        component.openLanguageModal(content);

        expect(component.modalData.title).toBe('LanguagePopupTitle');
        expect(component.modalData.items).toEqual([
            { locale: 'en_US', displayValue: 'English' },
            { locale: 'it_IT', displayValue: 'Italian' },
            { locale: 'ar_SA', displayValue: 'Arabic' },
        ]);

        expect(modalService.open).toHaveBeenCalledWith(content, { ariaLabelledBy: 'Select Language' });
    });

    it('should open region modal and log selected region', async () => {
        const content = {}; // Mock content
        const mockModalRef = {
            result: Promise.resolve({ displayValue: 'Asia' }),
            componentInstance: {},
            close: jasmine.createSpy('close'),
            dismiss: jasmine.createSpy('dismiss'),
        } as unknown as NgbModalRef;

        modalService.open.and.returnValue(mockModalRef);

        component.openRegionModal(content);

        expect(modalService.open).toHaveBeenCalledWith(content, { ariaLabelledBy: 'Select Regions' });

        // Resolve the promise and check the result
        await mockModalRef.result.then((selectedItem) => {
            expect(selectedItem.displayValue).toBe('Asia');
        });
    });

    it('should open a URL in a popup window', () => {
        spyOn(window, 'open');
        const url = 'https://example.com';
        component.openUrl(url);
        expect(window.open).toHaveBeenCalledWith(url, 'popupWindow', 'width=800,height=600,scrollbars=no,resizable=no');
    });
});
