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

}
