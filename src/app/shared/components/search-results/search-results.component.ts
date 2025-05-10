import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../../core/services/search/search.service';
import { ApiService } from '../../../core/services/api/api.service';
import { CommonStateService } from '../../../core/services/common-state/common-state.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'hec-search-results',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.scss',
})
export class SearchResultsComponent implements OnInit {
  searchResults: any[] = [];
  favoriteGuids: Set<string> = new Set(); // Store favorite GUIDs for quick lookup
  loading: boolean = false;

  constructor(
    private searchService: SearchService,
    private apiService: ApiService,
    private commonStateService: CommonStateService
  ) {}

  ngOnInit() {
    // Fetch favorite list
    this.fetchFavoriteList();

    // Subscribe to search results
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
            isFavorite: this.favoriteGuids.has(item.guid), 
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

  
  private fetchFavoriteList() {
    this.apiService.getFavouriteListGuids().subscribe({
      next: (response: any) => {
        try {
          const favoriteData = JSON.parse(response.body);
          console.log('favoriteData', favoriteData);
          if (favoriteData?.favorite?.length) {
            this.favoriteGuids = new Set(favoriteData.favorite.map((fav: any) => fav.guid));
            console.log('favoriteGuids', this.favoriteGuids);
          }
        } catch (error) {
          console.error('Error parsing favorite list:', error);
        }
      },
      error: (error) => {
        console.error('Error fetching favorite list:', error);
      },
    });
  }

  // ✅ Toggle favorite status and update UI immediately
  toggleFavorite(result: any) {
    if (result.isFavorite) {
      result.isFavorite = false;
      this.favoriteGuids.delete(result.guid);
      this.apiService.deleteFavorite(result.guid).subscribe({
        next: () => {
          console.log('Removed from favorites');
        },
        error: (error) => {
          console.error('Error removing from favorites:', error);
          result.isFavorite = true; // Revert if API fails
        }
      });
    } else {
      result.isFavorite = true;
      this.favoriteGuids.add(result.guid);
      this.apiService.addFavorite(result.guid).subscribe({
        next: () => {
          console.log('Added to favorites');
        },
        error: (error) => {
          console.error('Error adding to favorites:', error);
          result.isFavorite = false; // Revert if API fails
        }
      });
    }
  }
}
