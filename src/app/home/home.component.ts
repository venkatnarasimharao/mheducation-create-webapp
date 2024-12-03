import { Component } from '@angular/core';
import { SidenavComponent } from "../sidenav/sidenav.component";
import { HeaderWrapperComponent } from '../header-wrapper/header-wrapper.component';
import { HeaderBannerComponent } from '../header-banner/header-banner.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    SidenavComponent,
    HeaderWrapperComponent,
    HeaderBannerComponent
],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
