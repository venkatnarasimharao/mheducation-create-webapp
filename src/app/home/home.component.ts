import { Component } from '@angular/core';
import { HeaderWrapperComponent } from '../header-wrapper/header-wrapper.component';
import { SearchProductComponent } from '../search-product/search-product.component';
import { ImageGalleryComponent } from '../image-gallery/image-gallery.component';
import { A11yModule } from '@angular/cdk/a11y';
import { HeaderBannerComponent } from '../header-banner/header-banner.component';
import { SidenavComponent } from '../sidenav/sidenav.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeaderWrapperComponent,
    SidenavComponent,
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
