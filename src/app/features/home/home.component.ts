import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ImageGalleryService } from '../../core/services/image-gallery/image-gallery.service';
import { ImageCardComponent } from '../../shared/components/image-card/image-card.component';
import { CommonModule } from '@angular/common';
import { A11yModule } from '@angular/cdk/a11y';

@Component({
  selector: 'hec-home',
  standalone: true,
  imports: [
    A11yModule,
    RouterModule,
    ImageCardComponent,
    CommonModule,
    TranslateModule
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  collectionsData: { code: string; name: string; image: string; category: string }[] = [];

  constructor(
    private readonly router: Router,
    private readonly imageService: ImageGalleryService
  ) {}

  ngOnInit(): void {
    this.loadCollections();
  }

  private loadCollections(): void {
    this.imageService.getCollections().subscribe({
      next: (data) => {
        this.collectionsData = data.slice(0, 16);;
      },
      error: (err) => {
        console.error('Error loading collections data:', err);
      }
    });
  }

  isHomePage(): boolean {
    return this.router.url === '/home';
  }

  isAllCollectionsPage(): boolean {
    return this.router.url === '/all-collections';
  }
}
