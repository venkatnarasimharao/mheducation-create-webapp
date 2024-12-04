import { Component } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent {
  activeItem: string = 'find';

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
