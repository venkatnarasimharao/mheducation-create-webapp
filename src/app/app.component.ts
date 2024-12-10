import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { HeaderWrapperComponent } from "./header-wrapper/header-wrapper.component";
import { TranslateModule } from '@ngx-translate/core';
import { ApiService } from './services/api.service';
import { SharedstateService } from './services/sharedstate.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderWrapperComponent,
    FooterComponent,
    TranslateModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  constructor(
    private apiService: ApiService,
    private sharedStateService: SharedstateService,
  ) { }
  ngOnInit(): void {
    this.sharedStateService.getLanguages();
    this.getCollectionsList();
  }


  getCollectionsList() {
    this.apiService.getCollectionsList().subscribe((data: any) => {
      console.log(data, 'getCollectionsList')
    });

    this.getSearchListing();
  }

  getSearchListing() {
    this.apiService.getSearchListing().subscribe((data: any) => {
      console.log(data, 'cccccccccccc')
    });
  }
}
