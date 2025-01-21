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
import { ApiService } from '../../core/services/api/api.service';
import { ImageCardComponent } from '../../shared/components/image-card/image-card.component';
import { SearchbarComponent } from '../../shared/components/searchbar/searchbar.component';

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
    SearchbarComponent
  ],
  templateUrl: './search-find-content.component.html',
  styleUrls: ['./search-find-content.component.scss'],
})
export class SearchFindContentComponent implements OnInit {
  translate: TranslateService = inject(TranslateService);
  //dropdownTitle
  selectProjectTitle: string = 'Test123';
  selectFormatTitle: string = 'PleaseSelect';
  selectArrangeTitle: string = 'Arrange';
  collectionDetails: SearchCollectionInterface | null = null;
  
  // Inject ApiService
  private apiService: ApiService = inject(ApiService);
  
  // Store API data here
  collections: any[] = [];

  //dropdown items
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

  //dropdown heading
  selectProjectHeading: string = 'SelectProject';
  selectFormatHeading: string = 'SelectFormat';
  arrangeHeading: string = '86 pgs / $12.46 est';

  constructor(private route: ActivatedRoute, private readonly imageService: ImageGalleryService) {}

  ngOnInit(): void {
    // Combine route params and query params
    combineLatest([this.route.params, this.route.queryParams])
      .pipe(
        map((results) => ({ params: results[0], query: results[1] })),
      )
      .subscribe((results: any) => {
        const queryparam = results.query;
        
        if (queryparam.collectionCode) {
          this.collectionDetails = this.imageService.getImageByCode(queryparam.collectionCode);
        }
      });

    // Call the API to fetch collections data
    this.apiService.getCollectionsList().subscribe({
      next: (response) => {
        if (response?.body) {
          const parsedBody = JSON.parse(response.body); // Parse JSON
          console.log('Parsed response', parsedBody);
    
          if (parsedBody?.search?.valuefacets?.facet) {
            this.collections = parsedBody.search.valuefacets.facet.map((facet: any) => {
              // Check if facet.item is an array, otherwise fallback to an empty array
              const items = Array.isArray(facet.item) ? facet.item : [facet.item].filter(Boolean);
    
              return {
                header: facet?.['@attributes']?.label,
                displayType: facet?.['@attributes']?.displayType,
                collectionTypes: items.map((item: any) => ({
                  label: item?.['@attributes']?.label,
                  selected: item?.['@attributes']?.selected,
                  value: item?.['@attributes']?.value,
                }))
              };
            });
          }
    
          console.log('Processed collectionfilterData:', this.collections);
        }
      },
      error: (err) => {
        console.error('Error fetching collections:', err);
      }
    });
    
  }
  onSelect(item: { id: number; name: string }) {
    this.selectProjectTitle = item.name;
  }

  onSelected(item: { id: number; name: string }) {
    this.selectFormatTitle = item.name;
  }

  // Pagination
  currentPageNumber: number = 1;
  totalPagesCount: number = 100;
  pagePerItem: number = 5;

  onPageChange(newPage: number) {
    this.currentPageNumber = newPage;
    console.log('Page changed to:', newPage);
  }
}
