import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'hec-root',
  standalone: true,
  imports: [
    RouterOutlet,
    TranslateModule,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    CommonModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  hideLayout = false;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.router.events.subscribe(() => {
      const currentRoute = this.activatedRoute.root.firstChild?.snapshot;
      this.hideLayout = currentRoute?.data?.['hideLayout'] || false;
    });
  }

  ngOnInit(): void {
  }

}
