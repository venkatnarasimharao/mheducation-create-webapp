import { Component } from '@angular/core';

@Component({
  selector: 'app-header-banner',
  standalone: true,
  imports: [],
  templateUrl: './header-banner.component.html',
  styleUrl: './header-banner.component.scss'
})
export class HeaderBannerComponent {
  brandName: string = 'Create';

  BrandList: any [] = [
    {
      SubHeading: 'Search Content',
      Description: 'Search and select content from Mc Graw-Hill and 3rd party providers',
      logoClass : 'fa-solid fa-magnifying-glass'
    },
    {
      SubHeading: 'Arrange',
      Description: "Customize your project's table of Content",
      logoClass : 'fa-solid fa-layer-group'
    },
    {
      SubHeading: 'Personalize',
      Description: 'Select a cover, format and delivery method for your project',
      logoClass : 'fa-solid fa-book-open-reader'
    }
  ]


}
