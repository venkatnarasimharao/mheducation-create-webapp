import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { HeaderWrapperComponent } from "./header-wrapper/header-wrapper.component";
import {SearchProductComponent} from "./search-product/search-product.component";
import {ImageGalleryComponent} from "./image-gallery/image-gallery.component";
import { A11yModule } from '@angular/cdk/a11y';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    FooterComponent,
    HeaderWrapperComponent,
    SearchProductComponent,
    ImageGalleryComponent,
    A11yModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  constructor() { }
  ngOnInit(): void {

  }
}
