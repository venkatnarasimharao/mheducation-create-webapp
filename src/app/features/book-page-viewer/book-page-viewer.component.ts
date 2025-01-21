import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from '../../shared/components/login/login.component';
import { ApiService } from './../../core/services/api/api.service';
import { AuthService } from './../../core/services/auth/auth.service';
import { Component, Input, input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { D } from '@angular/cdk/keycodes';
import { dateTimestampProvider } from 'rxjs/internal/scheduler/dateTimestampProvider';

@Component({
  selector: 'hec-book-page-viewer',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './book-page-viewer.component.html',
  styleUrl: './book-page-viewer.component.scss'
})
export class BookPageViewerComponent implements OnInit, OnChanges {
  isAnonymous: boolean = true;
  imageUrl: any;
  bookData: any = {};
  pageNumber: number = 1;
  pageCount: number = 0;
  @Input() currentChapter: any;

  constructor(private AuthService: AuthService,
    private ApiService: ApiService,
    private modalService: NgbModal
  ) { }
  ngOnInit(): void {
    console.log("parent", this.currentChapter)
    this.isAnonymous = this.AuthService.isAnonymous();
    this.pageCount = this.currentChapter.pageCount;
    // this.fetchBookData();
    if (!this.isAnonymous) {
      this.fetchBookPageView();
    }
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['currentChapter'] && changes['currentChapter'].currentValue) {
      console.log('currentChapter changed:', changes['currentChapter'].currentValue);

      // Reset page number if needed
      this.pageNumber = 1;
      this.pageCount = this.currentChapter.pageCount || 0;
      this.fetchBookPageView();
    }
  }
  handleSign() {
    const modalRef = this.modalService.open(LoginComponent, { centered: false });
    modalRef.result.then(() => {
      this.isAnonymous = this.AuthService.isAnonymous();
      console.log(this.isAnonymous);
      // if (!this.isAnonymous) {
      //   this.fetchBookPageView();
      // }
    });
  }
  setPageNumber() {

  }
  handleChangePage(change: number) {
    this.pageNumber += change;
    this.fetchBookPageView();
    console.log(this.pageNumber, this.currentChapter);
  }


  private fetchBookPageView(): void {
    this.ApiService.getBookPageView().subscribe((data: any) => {
      console.log(data, "data");

    });
    // this.imageUrl = `https://createqa.mheducation.com/createonline/users/1000507376/preview/${this.currentChapter.guid}/${this.pageNumber}?nocacheTimestamp=${Date.now()}`;

    console.log(this.imageUrl, "imageUrl");
    const payload = { guid: this.currentChapter.guid, pageNumber: "1" };
    this.ApiService.getBookPageView().subscribe(
      (response: any) => {
        console.log(response, 'getBookPageView');
        if (response.body?.type === 'image/jpeg' || response.body?.type === 'image/png') {
          const blobUrl = URL.createObjectURL(response.body);
          this.imageUrl = blobUrl;
        } else {
          console.error('Invalid image type:', response.body?.type);
        }
      },
      (error: any) => {
        console.error('Error fetching book data:', error); // Basic error handling
        // Optionally, display a user-friendly message here
      }
    );
  }

}
