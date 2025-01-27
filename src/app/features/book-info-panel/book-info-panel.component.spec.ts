import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookInfoPanelComponent } from './book-info-panel.component';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { ApiService } from './../../core/services/api/api.service';
import { AuthService } from './../../core/services/auth/auth.service';
import { CommonStateService } from './../../core/services/common-state/common-state.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BookPageViewerComponent } from '../book-page-viewer/book-page-viewer.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

describe('BookInfoPanelComponent', () => {
  let component: BookInfoPanelComponent;
  let fixture: ComponentFixture<BookInfoPanelComponent>;
  let mockApiService: any;
  let mockAuthService: any;
  let mockCommonStateService: any;
  let mockModalService: any;
  let mockRouter: any;
  let mockActivatedRoute: any;

  beforeEach(async () => {
    // Mock services
    mockApiService = { getBookDetails: jasmine.createSpy().and.returnValue(of({ ok: true, body: '{"title": "Mock Book"}' })) };
    mockAuthService = { loginStatus$: of('success') };
    mockCommonStateService = { isAnonymous: jasmine.createSpy().and.returnValue(true) };
    mockModalService = { open: jasmine.createSpy().and.returnValue({ result: Promise.resolve() }) };
    mockRouter = { navigate: jasmine.createSpy('navigate') };
    mockActivatedRoute = {
      queryParams: of({ guid: 'mock-guid' }),
    };

    await TestBed.configureTestingModule({
      imports: [CommonModule, FormsModule, BookInfoPanelComponent, BookPageViewerComponent], // Include BookInfoPanelComponent here
      providers: [
        { provide: ApiService, useValue: mockApiService },
        { provide: AuthService, useValue: mockAuthService },
        { provide: CommonStateService, useValue: mockCommonStateService },
        { provide: NgbModal, useValue: mockModalService },
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BookInfoPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should set current chapter and update route on setCurrentChapter', () => {
    // Mock tocList with some data
    component.tocList = {
      Part1: [
        { title: 'Chapter 1', pageCount: '10', originalNumber: 1, guid: 'chapter1-guid' },
      ],
    };

    // Call setCurrentChapter with valid part and chapter
    component.setCurrentChapter('Part1', 0);

    // Verify that currentChapter is set correctly
    expect(component.currentChapter).toEqual({
      title: 'Chapter 1',
      pageCount: '10',
      originalNumber: 1,
      guid: 'chapter1-guid',
    });

    // Verify that router navigate was called with the correct query parameters
    expect(mockRouter.navigate).toHaveBeenCalledWith([], {
      queryParams: { part: 'Part1', chapter: 0 },
      queryParamsHandling: 'merge',
    });
  });
});
