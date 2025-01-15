import { Component, inject, OnInit } from '@angular/core';
import { BreadcrumbComponent } from '../../shared/components/breadcrumb/breadcrumb.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { NgbDropdownToggleNoCaretDirective } from '../../shared/directives/dropdown-toggle-css.directive';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PaginationComponent } from '../../shared/components/pagination/pagination.component';
import { FilterAccordionComponent } from '../../shared/components/filter-accordion/filter-accordion.component';
import { AccordionItem } from '../../shared/models/search.model';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { SearchResultsComponent } from '../../shared/components/search-results/search-results.component';
import { combineLatest, map } from 'rxjs';
import { ImageGalleryService } from '../../core/services/image-gallery/image-gallery.service';
import { ImageCardComponent } from '../../shared/components/image-card/image-card.component';
import { SearchCollectionInterface } from '../../shared/models/search.model';

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
    SearchResultsComponent
    TranslateModule,
    ImageCardComponent
  ],
  templateUrl: './search-find-content.component.html',
  styleUrl: './search-find-content.component.scss',
})
export class SearchFindContentComponent implements OnInit{
  
  translate: TranslateService = inject(TranslateService);
  //dropdownTitle
  selectProjectTitle: string = 'Test123';
  selectFormatTitle: string = 'PleaseSelect';
  selectArrangeTitle: string = 'Arrange';
  collectionDetails: SearchCollectionInterface| null = null;
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
    combineLatest([this.route.params, this.route.queryParams])
      .pipe(
        map((results) => ({ params: results[0], query: results[1] })),
      )
      .subscribe((results: any) => {
        const queryparam = results.query;
        
   
        if (queryparam.collectionCode) {
           this.collectionDetails =  this.imageService.getImageByCode(queryparam.collectionCode);
        }
      });
  }
  
  
  onSelect(item: { id: number; name: string }) {
    this.selectProjectTitle = item.name;
  }

  onSelected(item: { id: number; name: string }) {
    this.selectFormatTitle = item.name;
  }

  //pagination
  currentPageNumber: number = 1;
  totalPagesCount: number = 100;
  pagePerItem: number = 5;
  
  onPageChange(newPage: number) {
    this.currentPageNumber = newPage;
    console.log('Page changed to:', newPage);
  }

  collectionfilter: AccordionItem[] = [
      {
        id: 'panel1',
        header: 'Type',
        collectionTypes: [
          { label: 'Part', value: '(171)' },
          { label: 'PartOpener', value: '(183)' },
          { label: 'Books', value: '(13)' },
          { label: 'Videos', value: '(104)' },
          { label: 'Upload', value: '' },
          { label: 'Article', value: '(5)' },
          { label: 'Case', value: '(177)' },
        ],
      },
      {
        id: 'panel2',
        header: 'InstructorMaterials',
        collectionTypes: [{ label: 'AvailableaseBook', value: '(305)' }],
      },
      {
        id: 'panel3',
        header: 'PublicationYear',
        collectionTypes: [
          { label: '2022', value: '' },
          { label: '2021', value: '' },
          { label: '2020', value: '(39)' },
          { label: '2019', value: '' },
          { label: '2018', value: '(63)' },
          { label: '2017', value: '' },
          { label: '2016', value: '(27)' },
          { label: '2015', value: '(49)' },
          { label: '2014', value: '(18)' },
          { label: 'before2014', value: '(104)' },
        ],
      },
      {
        id: 'panel4',
        header: 'PageLength',
        collectionTypes: [
          { label: 'Brief(1-4pages)', value: '(135)' },
          { label: 'Medium(5-9pages)', value: '(27)' },
          { label: 'Long(10+pages)', value: '(169)' },
        ],
      },
    ];

}
