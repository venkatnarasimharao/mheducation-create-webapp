import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { HeaderWrapperComponent } from "./header-wrapper/header-wrapper.component";
import { TranslateService } from '@ngx-translate/core';
import { TranslateModule } from '@ngx-translate/core';
import { HomeComponent } from "./home/home.component";
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderWrapperComponent,
    FooterComponent, TranslateModule,
    HomeComponent
],
  
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  
  ngOnInit(): void {

  }
  translate: TranslateService =inject(TranslateService);
 
  changeLanguage(lang: string): void {
    this.translate.use(lang);
  }
}
