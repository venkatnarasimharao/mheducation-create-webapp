import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SearchState } from '../../../shared/models/search.model';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private searchStateSource = new BehaviorSubject<SearchState>({
    loading: false,
    query: '',
    textType: [],
    findable: false,
  });

  private payload: any = null;

  searchResults = this.searchStateSource.asObservable();

  updateSearchResult(data: any) {
    this.searchStateSource.next({
      loading: false,
      result: JSON.parse(data),
      query: this.searchStateSource.value.query,
      textType: this.searchStateSource.value.textType,
      findable: this.searchStateSource.value.findable,
    });
  }

  updateSearchQuery(payload: any) {
    // Update search state with query, textType, and findable
    this.searchStateSource.next({
      ...this.searchStateSource.value,
      query: payload.search.query,
      textType: payload.search.textTypes.textType,
      findable: payload.search.findable,
    });
  
    // Update payload
    this.payload = payload;
  }

  startSearch() {
    this.searchStateSource.next({
      loading: true,
      query: this.searchStateSource.value.query,
      textType: this.searchStateSource.value.textType,
      findable: this.searchStateSource.value.findable,
    });
  }

  // Simplified payload methods
  getPayload(): any {
    return this.payload;
  }

  setPayload(newPayload: any): void {
    this.payload = newPayload;
  }
}