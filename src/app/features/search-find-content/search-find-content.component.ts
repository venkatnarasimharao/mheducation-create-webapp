import { Component, inject, OnInit } from '@angular/core';
import { BreadcrumbComponent } from '../../shared/components/breadcrumb/breadcrumb.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { NgbDropdownToggleNoCaretDirective } from '../../shared/directives/dropdown-toggle-css.directive';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PaginationComponent } from '../../shared/components/pagination/pagination.component';
import { FilterAccordionComponent } from '../../shared/components/filter-accordion/filter-accordion.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { SearchResultsComponent } from '../../shared/components/search-results/search-results.component';
import { combineLatest, map } from 'rxjs';
import { ImageGalleryService } from '../../core/services/image-gallery/image-gallery.service';
import { SearchCollectionInterface } from '../../shared/models/search.model';
import { ImageCardComponent } from '../../shared/components/image-card/image-card.component';
import { SearchbarComponent } from '../../shared/components/searchbar/searchbar.component';
import { SearchService } from '../../core/services/search/search.service';
import { SortbyComponent } from '../../shared/components/sortby/sortby.component';
import { ApiService } from '../../core/services/api/api.service';

@Component({
  selector: 'hec-search-find-content',
  standalone: true,
  imports: [
    BreadcrumbComponent,
    NgbDropdownModule,
    CommonModule,
    NgbDropdownToggleNoCaretDirective,
    RouterModule,
    PaginationComponent,
    FilterAccordionComponent,
    TranslateModule,
    SearchResultsComponent,
    ImageCardComponent,
    SearchbarComponent,
    SortbyComponent,
  ],
  templateUrl: './search-find-content.component.html',
  styleUrl: './search-find-content.component.scss',
})
export class SearchFindContentComponent implements OnInit {
  translate: TranslateService = inject(TranslateService);
  selectProjectTitle: string = 'Test123';
  selectFormatTitle: string = 'PleaseSelect';
  selectArrangeTitle: string = 'Arrange';
  collectionDetails: SearchCollectionInterface | null = null;
  totalResults: number = 0;
  Math = Math;
  collections: any[] = [];

  selectProjectItems: any[] = [
    { id: 1, name: 'Project1' },
    { id: 2, name: 'Project2' },
    { id: 3, name: 'Project3' },
  ];

  selectFormatItems: any[] = [
    { id: 1, name: 'Format1' },
    { id: 2, name: 'Format2' },
    { id: 3, name: 'Format3' },
  ];

  selectProjectHeading: string = 'SelectProject';
  selectFormatHeading: string = 'SelectFormat';
  arrangeHeading: string = '86 pgs / $12.46 est';

  currentPage: number = 1;
  totalPagesCount: number = 1;
  pagePerItem: number = 5;
  resultsPerPage: number = 20;

  startValue: number = 1; 
  endValue: number = 20;
  loading: boolean = false;
  sfcloading: boolean = true;
  searchedTerm: string = '';

  constructor(
    private route: ActivatedRoute,
    private readonly imageService: ImageGalleryService,
    private searchService: SearchService, 
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    const payload = this.searchService.getPayload();

    this.searchService.searchResult$.subscribe((state) => {
      this.loading = state.loading;
      if (state.result) {
        const estimate = state.result?.estimate;
        if (estimate) {
          this.totalPagesCount = Math.ceil(Number(estimate) / this.resultsPerPage);
          this.totalResults = state.result?.estimate || 0;
        }
      }
    });

    combineLatest([this.route.params, this.route.queryParams])
      .pipe(map((results) => ({ params: results[0], query: results[1] })))
      .subscribe((results: any) => {
        const queryparam = results.query;

        if (queryparam.collectionCode) {
          this.collectionDetails = this.imageService.getImageByCode(queryparam.collectionCode);
        }
      });

    // Fetch collections from SearchService
    this.searchService.fetchCollectionsList();
    
    this.searchService.collectionsList$.subscribe((collections) => {
      this.collections = collections;
      this.sfcloading = false;
    });
  }

  onSelect(item: { id: number; name: string }) {
    this.selectProjectTitle = item.name;
  }

  onSelected(item: { id: number; name: string }) {
    this.selectFormatTitle = item.name;
  }

  onPageChange(newPage: number): void {
    this.currentPage = newPage;

    const finalPayload = this.searchService.getPayload();

    if (finalPayload) {
      this.startValue = (newPage - 1) * this.resultsPerPage + 1;
      finalPayload.search.start = this.startValue;

      this.searchService.startSearch();

      this.searchService.fetchCollectionsList(); // Refresh collections on page change

      this.searchService.getPayload().search.start = this.startValue;

       // Call the API to fetch updated results based on the new page
       this.apiService.getSearchListing(finalPayload).subscribe({
        next: (response) => {
          if (response.ok) {
            this.searchService.updateSearchResult(response.body);
          }
        },
        error: (err) => {
          console.error('API Error:', err);
        },
      });
    }
  }
}
