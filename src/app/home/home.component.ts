import { Component } from '@angular/core';
import { SidenavComponent } from "../sidenav/sidenav.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    SidenavComponent
],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
