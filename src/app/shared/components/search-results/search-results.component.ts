
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../../core/services/search/search.service';

@Component({
  selector: 'hec-search-results',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.scss'
})
export class SearchResultsComponent implements OnInit {
  searchResults: any[] = [];
  loading: boolean = false;
  noResults: boolean = false;

  constructor(private searchService: SearchService) {}

  ngOnInit() {
    this.searchService.searchResults.subscribe({
      next: (state) => {
        this.loading = state.loading;
        
        if (!state.loading && state.result) {
          if (state.result.result) {
            this.searchResults = state.result.result.map((item: any) => ({
              type: item.type,
              title: item.title,
              authors: item.authors,
              year: item.year,
              isbn: item.isbn,
              description: item.description,
              language: item.language,
              enableAddButton: item.enableAddButton,
            }));
            this.noResults = false;
          } else {
            this.noResults = true;
          }
        }
      },
      error: (error) => {
        console.error('Error fetching search results:', error);
        this.loading = false;
        this.noResults = true;
      }
    });
  }
}