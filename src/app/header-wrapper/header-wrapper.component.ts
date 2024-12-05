import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { SidenavComponent } from "../sidenav/sidenav.component";

@Component({
  selector: 'app-header-wrapper',
  standalone: true,
  imports: [
    HeaderComponent,
    SidenavComponent,
    HeaderWrapperComponent
],
  templateUrl: './header-wrapper.component.html',
  styleUrl: './header-wrapper.component.scss'
})
export class HeaderWrapperComponent {

}
