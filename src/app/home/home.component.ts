import { Component } from '@angular/core';
import { SidenavComponent } from "../sidenav/sidenav.component";
import { HeaderBannerComponent } from '../header-banner/header-banner.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    SidenavComponent,
    HeaderBannerComponent,
],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
