import { ApiService } from './../../core/services/api/api.service';
import { Component, OnInit } from '@angular/core';
import { BookInfoPanelComponent } from '../book-info-panel/book-info-panel.component';
import { BookPageViewerComponent } from '../book-page-viewer/book-page-viewer.component';

@Component({
  selector: 'hec-preview',
  standalone: true,
  imports: [BookInfoPanelComponent, BookPageViewerComponent],
  templateUrl: './preview.component.html',
  styleUrl: './preview.component.scss'
})
export class PreviewComponent implements OnInit {

  bookData: any = {}; // Holds the data for the book

  constructor(private apiService: ApiService) { } // Changed to camelCase

  ngOnInit(): void {
    this.fetchBookData(); // Abstracted API call into a method for reusability
  }

  private fetchBookData(): void {
    this.apiService.getBookDetails().subscribe(
      (response: any) => {
        this.bookData = JSON.parse(response.body); // Assign API response to bookData
        console.log('Book data fetched successfully:', this.bookData); // Debugging
      },
      (error: any) => {
        console.error('Error fetching book data:', error); // Basic error handling
      }
    );
  }

}
