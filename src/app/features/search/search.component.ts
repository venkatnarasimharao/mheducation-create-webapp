import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ImageGalleryService } from '../../core/services/image-gallery/image-gallery.service';

@Component({
  selector: 'hec-search',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  collectionsData: { code: string; name: string; image: string; category: string }[] = [];
  image: string = '';

  constructor(private readonly imageService: ImageGalleryService) {}

  ngOnInit(): void {
    this.loadImage();
  }

  private loadImage(): void {
    this.image = this.imageService.getImage();
  }
}
