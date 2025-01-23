import { ApiService } from './../../core/services/api/api.service';
import { Component, OnInit } from '@angular/core';
import { BreadcrumbComponent } from '../../shared/components/breadcrumb/breadcrumb.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { NgbDropdownToggleNoCaretDirective } from '../../shared/directives/dropdown-toggle-css.directive';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { combineLatest, map } from 'rxjs';
import { ImageGalleryService } from '../../core/services/image-gallery/image-gallery.service';
import { TranslateModule } from '@ngx-translate/core';
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
    TranslateModule,
    ImageCardComponent
  ],
  templateUrl: './search-find-content.component.html',
  styleUrl: './search-find-content.component.scss',
})
export class SearchFindContentComponent implements OnInit {
  //dropdownTitle
  selectProjectTitle: string = 'Test123';
  selectFormatTitle: string = 'Please Select';
  selectArrangeTitle: string = 'Arrange';
  collectionDetails: SearchCollectionInterface | null = null;
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

  constructor(private route: ActivatedRoute, private readonly imageService: ImageGalleryService,
    private ApiService: ApiService,
    private router: Router,
  ) { }

  ngOnInit(): void {
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
  }


  onSelect(item: { id: number; name: string }) {
    this.selectProjectTitle = item.name;
  }

  onSelected(item: { id: number; name: string }) {
    this.selectFormatTitle = item.name;
  }
  openBookDetails() {
    this.router.navigate(['/preview'], {
      queryParams: { guid: "99c9fd84-bc04-37a0-ab66-4a43927a421e" }
    });
  }
}
