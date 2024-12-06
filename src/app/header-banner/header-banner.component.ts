import { Component, inject } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header-banner',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './header-banner.component.html',
  styleUrl: './header-banner.component.scss'
})
export class HeaderBannerComponent {
  brandName: string = 'Create';

  translate: TranslateService = inject(TranslateService);


}
