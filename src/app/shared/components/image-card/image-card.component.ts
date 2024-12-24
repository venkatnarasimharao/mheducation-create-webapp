import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ImageGalleryService } from '../../../core/services/image-gallery/image-gallery.service';

@Component({
  selector: 'hec-image-card',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './image-card.component.html',
  styleUrls: ['./image-card.component.scss']
})
export class ImageCardComponent implements OnInit {
  @Input() image!: string; 
  @Input() name!: string; 

  constructor(
    private readonly imageService: ImageGalleryService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
   
  }

  viewDetails(image: string): void {
    if (this.image) {
      this.imageService.setImage(this.image);
      this.router.navigate(['/search-content'], { queryParams: { collectionCode: 'caseTopic' } });
    }
  }
}
