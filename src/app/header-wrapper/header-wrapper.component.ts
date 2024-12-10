import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";

@Component({
  selector: 'app-header-wrapper',
  standalone: true,
  imports: [
    HeaderComponent
],
  templateUrl: './header-wrapper.component.html',
  styleUrl: './header-wrapper.component.scss'
})
export class HeaderWrapperComponent {

}
