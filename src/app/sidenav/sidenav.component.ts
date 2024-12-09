import { Component, inject } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent {
  activeItem: string = 'find';
  translate: TranslateService = inject(TranslateService);

  setActive(item: string) {
    this.activeItem = item; 
  }
  handleKeydown(event: KeyboardEvent, item: string) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.setActive(item); 
    }
  }
}
