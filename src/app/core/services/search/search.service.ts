import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface SearchState {
  loading: boolean;
  result?: any;
}

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  // Initialize with loading: true
  private searchResultSource = new BehaviorSubject<SearchState>({
    loading: true
  });
  
  searchResults = this.searchResultSource.asObservable();

  updateSearchResult(data: any) {
    console.log('Data', data);
    // When updating results, set loading to false
    this.searchResultSource.next({
      loading: false,
      result: JSON.parse(data)
    });
  }

  // Add method to set loading state when search starts
  startSearch() {
    this.searchResultSource.next({
      loading: true
    });
  }
}