import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from '../../shared/components/login/login.component';
import { ApiService } from './../../core/services/api/api.service';
import { AuthService } from './../../core/services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'hec-book-page-viewer',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './book-page-viewer.component.html',
  styleUrl: './book-page-viewer.component.scss'
})
export class BookPageViewerComponent implements OnInit {
  isAnonymous: boolean = true;
  imageUrl: any;
  bookData: any = {};
  pageNumber: number = 0;

  constructor(private AuthService: AuthService,
    private ApiService: ApiService,
    private modalService: NgbModal
  ) { }
  ngOnInit(): void {
    this.isAnonymous = this.AuthService.isAnonymous();
    // this.fetchBookData();
    // if (!this.isAnonymous) {
    this.fetchBookPageView();
    // }
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

  private fetchBookPageView(): void {
    this.ApiService.getBookPageView().subscribe(
      (response: any) => {
        console.log(response, 'getBookPageView');
        if (response.type === 'image/jpeg' || response.type === 'image/png') {
          const blobUrl = URL.createObjectURL(response);
          this.imageUrl = blobUrl;
        } else {
          console.error('Invalid image type:', response?.type);
        }
      },
      (error: any) => {
        console.error('Error fetching book data:', error); // Basic error handling
        // Optionally, display a user-friendly message here
      }
    );
  }

}
