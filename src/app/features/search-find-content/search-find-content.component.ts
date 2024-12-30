import { Component, OnInit } from '@angular/core';
import { BreadcrumbComponent } from '../../shared/components/breadcrumb/breadcrumb.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { NgbDropdownToggleNoCaretDirective } from '../../shared/directives/dropdown-toggle-css.directive';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { SearchCollectionBannerComponent } from '../search-collection-banner/search-collection-banner.component';
import { combineLatest, map } from 'rxjs';
import { ImageGalleryService } from '../../core/services/image-gallery/image-gallery.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'hec-search-find-content',
  standalone: true,
  imports: [
    BreadcrumbComponent,
    NgbDropdownModule,
    CommonModule,
    NgbDropdownToggleNoCaretDirective,
    RouterModule,
    SearchCollectionBannerComponent,
    TranslateModule
  ],
  templateUrl: './search-find-content.component.html',
  styleUrl: './search-find-content.component.scss',
})
export class SearchFindContentComponent implements OnInit {
  //dropdownTitle
  selectProjectTitle: string = 'Test123';
  selectFormatTitle: string = 'Please Select';
  selectArrangeTitle: string = 'Arrange';

  //dropdown items
  selectProjectItems: any[] = [
    { id: 1, name: 'Project 1' },
    { id: 2, name: 'Project 2' },
    { id: 3, name: 'Project 3' },
  ];

  selectFormatItems: any[] = [
    { id: 1, name: 'Format 1' },
    { id: 2, name: 'Format 2' },
    { id: 3, name: 'Format 3' },
  ];

  //dropdown heading
  selectProjectHeading: string = 'Select Project';
  selectFormatHeading: string = 'Select Format';
  arrangeHeading: string = '86 pgs / $12.46 est';

  collectionsData: { code: string; name: string; image: string; category: string }[] = [];
  queryparam = {
    collectionCode: '',
  };
  constructor(private route: ActivatedRoute, private readonly imageService: ImageGalleryService) {}

  ngOnInit(): void {
    combineLatest([this.route.params, this.route.queryParams])
      .pipe(
        map((results) => ({ params: results[0], query: results[1] })),
      )
      .subscribe((results: any) => {
        this.queryparam = results.query;
  
        if (this.queryparam.collectionCode) {
          this.imageService.getCollections().subscribe((collections) => {
            const selectedCollection = collections.find(
              (c) => c.code === this.queryparam.collectionCode
            );
  
            if (selectedCollection) {
              this.imageService.setImage(selectedCollection.image);
            }
          });
        }
      });
  }
  
  
  onSelect(item: { id: number; name: string }) {
    this.selectProjectTitle = item.name;
  }

  onSelected(item: { id: number; name: string }) {
    this.selectFormatTitle = item.name;
  }
}
