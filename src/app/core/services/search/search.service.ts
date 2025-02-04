import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SearchState } from '../../../shared/models/search.model';
import { ApiService } from '../../services/api/api.service';

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
  private collectionsListSource = new BehaviorSubject<any[]>([]);
  collectionsList$ = this.collectionsListSource.asObservable();


  constructor(private apiService: ApiService) {}

  searchResult$ = this.searchStateSource.asObservable();


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

  fetchCollectionsList(): void {
    this.apiService.getCollectionsList().subscribe({
      next: (response) => {
        if (response.ok) {
          const parsedBody = JSON.parse(response.body);
          if (parsedBody?.search?.valuefacets?.facet) {
            const collections = parsedBody.search.valuefacets.facet.map((facet: any) => {
              const items = Array.isArray(facet.item) ? facet.item : [facet.item].filter(Boolean);
              return {
                header: facet?.label,
                displayType: facet?.displayType,
                collectionTypes: items.map((item: any) => ({
                  label: item?.label,
                  selected: item?.selected,
                  value: item?.value,
                })),
              };
            });

            this.collectionsListSource.next(collections);
          }
        }
      },
      error: (err) => {
        console.error('Error fetching collections:', err);
      },
    });
  }
}
