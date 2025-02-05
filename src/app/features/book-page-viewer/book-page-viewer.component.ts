import { CommonStateService } from './../../core/services/common-state/common-state.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from '../../shared/components/login/login.component';
import { ApiService } from './../../core/services/api/api.service';
import { AuthService } from './../../core/services/auth/auth.service';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'hec-book-page-viewer',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './book-page-viewer.component.html',
  styleUrl: './book-page-viewer.component.scss'
})
export class BookPageViewerComponent implements OnInit, OnChanges {
  isAnonymous: boolean = true;
  imageUrl: any;
  pageNumber: number = 1;
  pageCount: number = 1;
  @Input() currentChapter: any;
  pageViewLoading: boolean = false;
  prevButtonVisible: boolean = false;
  nextButtonVisible: boolean = false;
  isPreviousPage: boolean = false;
  constructor(private authService: AuthService,
    private apiService: ApiService,
    private commonStateService: CommonStateService,
    private modalService: NgbModal
  ) { }
  ngOnInit(): void {
    const userId = this.commonStateService.isAnonymous();
    let user = userId || "anonymous";
    this.isAnonymous = user ==="anonymous"? true:false;
    this.pageCount = this.currentChapter.pageCount;
    this.fetchBookPageView();
    this.authService.loginStatus$.subscribe((status) => {
      if (status === 'success') {
        this.isAnonymous = false;
        this.fetchBookPageView();
      }
    });

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['currentChapter'] && changes['currentChapter'].currentValue) {
      this.pageNumber = 1;
      this.pageCount = this.currentChapter.pageCount || 0;
      this.fetchBookPageView();
    }
  }


  handleSign() {
    const modalRef = this.modalService.open(LoginComponent, { centered: false });
    modalRef.result.then(() => {
      const userId = this.commonStateService.isAnonymous();
      let user = userId || "anonymous";
      this.isAnonymous = user ==="anonymous"? true:false;
      if (!this.isAnonymous) {
        this.fetchBookPageView();
      }
    });
  }
  setPageNumber() {
    this.fetchBookPageView();
  }

  setButtonVisibility() {
    if (this.pageNumber > 1) {
      this.prevButtonVisible = true;
    }
    else {
      this.prevButtonVisible = false;
    }
    if (this.pageNumber >= this.pageCount) {
      this.nextButtonVisible = false;
    }
    else {
      this.nextButtonVisible = true;
    }
  }
  handleChangePage(change: number) {
    this.pageNumber += change;
    this.fetchBookPageView();
  }


  private fetchBookPageView(): void {
    this.setButtonVisibility();
    if (this.isAnonymous) {
      return;
    }
    this.pageViewLoading = true;
    const payload = { guid: this.currentChapter.guid, pageNumber: this.pageNumber };
    this.apiService.getBookPageView(payload).subscribe({
      next: (response: any) => {
        if (response.ok) {
          this.pageViewLoading = false;
          this.isPreviousPage = true;
          if (response.body?.type === 'image/jpeg' || response.body?.type === 'image/png') {
            const blobUrl = URL.createObjectURL(response.body);
            console.log(blobUrl);
            this.imageUrl = blobUrl;
          } else {
            console.error('Invalid image type:', response.body?.type);
            this.imageUrl = this.commonStateService.getImageUrl("/createonline/images/bad_preview.jpg",false);
          }
        }
      },
      error: (error: any) => {
        this.pageViewLoading = false;
        this.isPreviousPage = true;
        this.imageUrl = this.commonStateService.getImageUrl("/createonline/images/bad_preview.jpg",false);
        console.error('Error fetching book data:', error);
      },
    });

  }

}
