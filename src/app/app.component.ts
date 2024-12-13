import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { HeaderWrapperComponent } from "./header-wrapper/header-wrapper.component";
import { ApiService } from './services/api.service';
import { SharedstateService } from './services/sharedstate.service';
import { SidenavComponent } from './sidenav/sidenav.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderWrapperComponent,
    FooterComponent,
    FooterComponent,
    TranslateModule,
    SidenavComponent
  ],
  templateUrl: './app.component.html',
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

    this.getLanguagePropsList();
  }

  getLanguagePropsList() {
    this.apiService.getLanguagePropsList().subscribe((data: any) => {
      if (data && JSON.parse(data)) {
        const languageProps = JSON.parse(data);
        console.log(languageProps, 'getLanguagePropsList')
      }
    });
    this.getTaxonomyfacetsList();
  }

  getTaxonomyfacetsList() {
    this.apiService.getTaxonomyfacetsList().subscribe((data: any) => {
      console.log(data, 'getTaxonomyfacetsList')
    });
    this.getCoverPhotosList();
  }

  getCoverPhotosList() {
    this.apiService.getCoverPhotosList().subscribe((data: any) => {
      console.log(data, 'getCoverPhotosList')
    });
    this.getSearchListing();
  }

  getSearchListing() {
    this.apiService.getSearchListing().subscribe((data: any) => {
      console.log(data, 'cccccccccccc')
    });

  }
}
