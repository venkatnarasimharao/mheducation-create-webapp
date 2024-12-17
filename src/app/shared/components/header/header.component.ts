import { Component } from '@angular/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbDropdownToggleNoCaretDirective } from '../../directives/dropdown-toggle-css.directive';
import { MenuSidebarService } from '../../../core/services/menu-sidebar/menuSidebarService.service';

@Component({
  selector: 'header',
  standalone: true,
  imports: [NgbDropdownModule, NgbDropdownToggleNoCaretDirective],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  host: {
    class: 'row border-bottom',
  }
})
export class HeaderComponent {
  imageUrl: string = "https://www.mheducation.co.in/static/version1732692363/frontend/Cti/canada-theme/en_GB/images/logo.svg";
  brandName: string = "Create";
  constructor(private menuService: MenuSidebarService){
  }

  openMenu() {
    this.menuService.requestOpenMenu();
  }
}
