import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ImageCardComponent } from '../../shared/components/image-card/image-card.component';
import { TranslateModule } from '@ngx-translate/core';
import { ImageGalleryService } from '../../core/services/image-gallery/image-gallery.service';

interface Collection {
  code: string;
  name: string;
  image: string;
}

interface GroupedCollection {
  category: string;
  collections: Collection[];
}

@Component({
  selector: 'hec-special-collection',
  standalone: true,
  imports: [CommonModule, RouterModule, ImageCardComponent, TranslateModule],
  templateUrl: './special-collection.component.html',
  styleUrls: ['./special-collection.component.scss']
})
export class SpecialCollectionComponent implements OnInit {
  showAll: boolean = false;
  groupedCollections: GroupedCollection[] = [];

  constructor(
    private readonly router: Router,
    private readonly imageService: ImageGalleryService
  ) {}

  ngOnInit(): void {
    this.checkPageType();
    this.loadGroupedCollections();
  }

  private checkPageType(): void {
    this.showAll = this.isAllCollectionsPage();
  }

  private loadGroupedCollections(): void {
    this.imageService.getGroupedCollections$().subscribe({
      next: (data) => {
        this.groupedCollections = data;
      },
      error: (err) => {
        console.error('Error loading collections:', err);
      }
    });
  }

  isHomePage(): boolean {
    return this.router.url === ' ';
  }

  isAllCollectionsPage(): boolean {
    return this.router.url === '/all-collections';
  }

  viewDetails(image: string): void {
    this.imageService.setImage(image);
    this.router.navigate(['/detail-info']);
  }
}
