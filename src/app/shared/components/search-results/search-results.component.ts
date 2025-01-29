
import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../../core/services/search/search.service';
import { ApiService } from '../../../core/services/api/api.service';
import { RouterModule } from '@angular/router';
import { CommonStateService } from '../../../core/services/common-state/common-state.service';

@Component({
  selector: 'hec-search-results',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.scss',
})
export class SearchResultsComponent implements OnInit {
  searchResults: any[] = [];
  loading: boolean = false;

  constructor(private searchService: SearchService, private apiService: ApiService, private commonStateService: CommonStateService) {}

  ngOnInit() {
    this.searchService.searchResult$.subscribe({
      next: (state) => {
        this.loading = state.loading;

        if (!state.loading && state.result && state.result.result) {
          const resultData = Array.isArray(state.result.result)
            ? state.result.result
            : [state.result.result]; //converting object to array

          this.searchResults = resultData.map((item: any) => ({
            type: item.type,
            title: item.title,
            authors: item.authors,
            year: item.year,
            isbn: item.isbn,
            guid: item.guid,
            description: item.description,
            enableAddButton: item.enableAddButton,
            imageUrl: this.commonStateService.getImageUrl(`/covers/${item.isbn}.jpeg`, false)
          }));
        } else {
          this.searchResults = [];
        }
      },
      error: (error) => {
        console.error('Error fetching search results:', error);
        this.loading = false;
      },
    });
  }
}
