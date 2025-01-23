import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface SearchState {
  loading: boolean;
  result?: any;
  query: string;
  textType: string[];
  findable: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private searchStateSource = new BehaviorSubject<SearchState>({
    loading: false,
    query: '',
    textType: [],
    findable: false
  });

  searchResults = this.searchStateSource.asObservable();

  updateSearchResult(data: any) {
    this.searchStateSource.next({
      loading:false,
      result: JSON.parse(data),
      query: this.searchStateSource.value.query,
      textType: this.searchStateSource.value.textType,
      findable: this.searchStateSource.value.findable
    });
  }

  updateSearchQuery(query: string, textType: string[], findable: boolean) {
    this.searchStateSource.next({
      ...this.searchStateSource.value,
      query,
      textType,
      findable
    });
  }

  startSearch() {
    this.searchStateSource.next({
      loading: true,
      query: this.searchStateSource.value.query,
      textType: this.searchStateSource.value.textType,
      findable: this.searchStateSource.value.findable
    });
  }
}
