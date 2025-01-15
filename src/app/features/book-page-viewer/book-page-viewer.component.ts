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
  bookData: any = {}; // Placeholder for book data
  constructor(private AuthService: AuthService,
    private ApiService: ApiService,
  ) { }
  ngOnInit(): void {
    this.isAnonymous = this.AuthService.isAnonymous(); // Fetch user authentication status on initialization
    this.fetchBookData(); // Abstracted API call into a method for reusability
  }

  private fetchBookData(): void {
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
