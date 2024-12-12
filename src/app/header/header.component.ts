import { Component, EventEmitter, inject, Output } from '@angular/core';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  imageurl: string = "https://www.mheducation.co.in/static/version1732692363/frontend/Cti/canada-theme/en_GB/images/logo.svg";
  brandName: string = "Create";

  selectedOption: string = '';
  @Output() sidebarToggle = new EventEmitter<void>();

  toggleSidebar() {
    this.sidebarToggle.emit();
  }
  translate: TranslateService =inject(TranslateService);
  onSelect(event: any) {
    this.selectedOption = event.target.value;

    // Check if an option has been selected
    if (!this.selectedOption) {
      alert('Please select an option!');
      // Focus back to the select element
      event.target.focus();
    }
  }
  changeLanguage(event: Event): void {
    const selectedLanguage = (event.target as HTMLSelectElement).value;
    this.translate.use(selectedLanguage);
    if(selectedLanguage =="arabic"){
      document.documentElement.dir = 'rtl';
    }
    else{
      document.documentElement.dir = 'ltr';
    }
  }

}

