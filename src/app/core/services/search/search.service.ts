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

  private textTypeSource = new BehaviorSubject<string[]>([]);  // New source to track textType

  private payload: any = null;

  constructor() {}

  searchResult$ = this.searchStateSource.asObservable();
  textType$ = this.textTypeSource.asObservable()


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
    this.searchStateSource.next({
      ...this.searchStateSource.value,
      query: payload.search.query,
      textType: payload.search.textTypes.textType,
      findable: payload.search.findable,
    });

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

  getPayload(): any {
    return this.payload;
  }

  setPayload(newPayload: any): void {
    this.payload = newPayload;
  }

  setTextType(selectedCategories: any):any {
    this.textTypeSource.next(selectedCategories);
  }
}