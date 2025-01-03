import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { SearchCollectionInterface } from '../../models/search.model';
@Component({
  selector: 'hec-image-card',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './image-card.component.html',
  styleUrls: ['./image-card.component.scss']
})
export class ImageCardComponent implements OnInit {
  @Input() cardData!: SearchCollectionInterface;
  constructor(
    private readonly router: Router
  ) { }

  ngOnInit(): void {

  }

  viewDetails(): void {
    if (this.cardData && this.cardData.code) {
      this.router.navigate(['/search-content'], { queryParams: { collectionCode: this.cardData.code } });
    }
  }
  
}
