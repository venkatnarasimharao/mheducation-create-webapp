import { AuthService } from './../../../core/services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { NgbDropdownModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbDropdownToggleNoCaretDirective } from '../../directives/dropdown-toggle-css.directive';
import { MenuSidebarService } from '../../../core/services/menu-sidebar/menuSidebarService.service';
import { TranslateModule } from '@ngx-translate/core';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'header',
  standalone: true,
  imports: [NgbDropdownModule, NgbDropdownToggleNoCaretDirective, TranslateModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  host: {
    class: 'row border-bottom',
  }
})
export class HeaderComponent implements OnInit {
  imageUrl: string = "https://www.mheducation.co.in/static/version1732692363/frontend/Cti/canada-theme/en_GB/images/logo.svg";
  loggedInStatus: string = "LogIn"

  constructor(private menuService: MenuSidebarService,
    private AuthService: AuthService,
    private modalService: NgbModal) {
  }
  ngOnInit(): void {
    this.AuthService.authStatus.subscribe((event: any) => {
      this.loggedInStatus = event;
    });
    if (this.AuthService.isAnonymous()) {
      this.loggedInStatus = "LogOut"
    }
  }
  openMenu() {
    this.menuService.requestOpenMenu();
  }
  changeLoginStatus() {
    if (this.loggedInStatus === "LogOut") {
      this.AuthService.logout();
      this.loggedInStatus = "LogIn";
    }
    else {
      this.modalService.open(LoginComponent, { centered: false });
    }
  }
}
