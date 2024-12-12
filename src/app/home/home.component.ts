import { Component } from '@angular/core';
import { SearchProductComponent } from '../search-product/search-product.component';
import { ImageGalleryComponent } from '../image-gallery/image-gallery.component';
import { A11yModule } from '@angular/cdk/a11y';
import { HeaderBannerComponent } from '../header-banner/header-banner.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    SearchProductComponent,
    ImageGalleryComponent,
    A11yModule,
    HeaderBannerComponent
],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
