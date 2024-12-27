import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterComponent } from './footer.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { MockTranslateLoader } from '../header/header.component.spec';
import { SharedstateService } from '../../../core/services/shared-state/sharedstate.service';
import { ApiService } from '../../../core/services/api/api.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

describe('FooterComponent', () => {
    let component: FooterComponent;
    let fixture: ComponentFixture<FooterComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [FooterComponent, TranslateModule.forRoot({
                defaultLanguage: 'en_US',
                loader: {
                    provide: TranslateLoader,
                    useClass: MockTranslateLoader,
                    deps: []
                }
            }),
                HttpClientModule,
            ],
            providers: [
                SharedstateService,
                ApiService,// Add services that depend on HttpClient here
                NgbModal
            ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(FooterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
