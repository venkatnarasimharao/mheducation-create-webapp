import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

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
  @Input() collectionCode!: string;
  constructor(
    private readonly router: Router
  ) { }

  ngOnInit(): void {

  }

  viewDetails(): void {
    this.router.navigate(['/search-content'], { queryParams: { collectionCode: this.collectionCode } });
  }
}
