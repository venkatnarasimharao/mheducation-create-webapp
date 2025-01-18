import { ApiService } from './../../core/services/api/api.service';
import { AuthService } from './../../core/services/auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'hec-book-page-viewer',
  standalone: true,
  imports: [],
  templateUrl: './book-page-viewer.component.html',
  styleUrl: './book-page-viewer.component.scss'
})
export class BookPageViewerComponent implements OnInit {
  isAnonymous: boolean = true;
  imageUrl: any;
  bookData: any = {}; // Placeholder for book data
  constructor(private AuthService: AuthService,
    private ApiService: ApiService,
  ) { }
  ngOnInit(): void {
    this.isAnonymous = this.AuthService.isAnonymous();
    this.fetchBookData();
  }

  private fetchBookData(): void {
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
