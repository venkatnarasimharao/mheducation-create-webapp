import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../../core/services/search/search.service';
import { ApiService } from '../../../core/services/api/api.service';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { CommonStateService } from '../../../core/services/common-state/common-state.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'hec-search-results',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.scss',
})
export class SearchResultsComponent implements OnInit {
  searchResults: any[] = [];
  loading: boolean = false;

  constructor(
    private searchService: SearchService,
    private apiService: ApiService,
    private commonStateService: CommonStateService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.searchService.searchResult$.subscribe({
      next: (state) => {
        this.loading = state.loading;

        if (!state.loading && state.result?.result) {
          const resultData = Array.isArray(state.result.result) ? state.result.result : [state.result.result];

          this.searchResults = resultData.map((item: any) => ({
            type: item.type,
            title: item.title,
            authors: item.authors,
            year: item.year,
            isbn: item.isbn,
            guid: item.guid,
            description: item.description,
            enableAddButton: item.enableAddButton,
            imageUrl: this.commonStateService.getImageUrl(`/covers/${item.isbn}.jpeg`, false),
            isFavorite: this.isFavorite(item.guid),
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

  isFavorite(guid: string): boolean {
    const favorites = this.route.snapshot.queryParams['favorites']?.split(',') || [];
    return favorites.includes(guid);
  }

  toggleFavorite(result: any) {
    if (result.isFavorite) {
      this.apiService.deleteFavorite(result.guid).subscribe(() => {
        result.isFavorite = false;
        this.updateQueryParams();
      });
    } else {
      this.apiService.addFavorite(result.guid).subscribe(() => {
        result.isFavorite = true;
        this.updateQueryParams();
      });
    }
  }

  private updateQueryParams() {
    const favoriteGuids = this.searchResults
      .filter((item) => item.isFavorite)
      .map((item) => item.guid)
      .join(',');

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { favorites: favoriteGuids },
      queryParamsHandling: 'merge',
    });
  }
}
