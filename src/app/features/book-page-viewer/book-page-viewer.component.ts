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
  bookData: any = {};
  pageNumber: number = 0;

  constructor(private AuthService: AuthService,
    private ApiService: ApiService,
    private modalService: NgbModal
  ) { }
  ngOnInit(): void {
    this.isAnonymous = this.AuthService.isAnonymous();
    // if (!this.isAnonymous) {
    this.fetchBookPageView();
    // }
  }
  handleSign() {
    const modalRef = this.modalService.open(LoginComponent, { centered: false });
    modalRef.result.then(() => {
      this.isAnonymous = this.AuthService.isAnonymous();
      console.log(this.isAnonymous);
      if (!this.isAnonymous) {
        this.fetchBookPageView();
      }
    });
  }
  setPageNumber() {

  }

  private fetchBookPageView(): void {
    this.bookData = `https://createqa.mheducation.com/createonline/users/1000507376/preview/321660fb-ec46-32a6-8e05-f088b0331fb4/1?nocacheTimestamp=${Date.now()}`
    this.ApiService.getBookPageView().subscribe(
      (response: any) => {
        try {
          // Parse API response safely
          // this.bookData = response.body ? JSON.parse(response.body) : {};
          console.log('Book Page View fetched successfully:', response); // Debugging
        } catch (error) {
          console.error('Error parsing book data:', error); // Handle JSON parsing errors
        }
      },
      (error: any) => {
        console.error('Error fetching book data:', error); // Basic error handling
        // Optionally, display a user-friendly message here
      }
    );
  }

}
