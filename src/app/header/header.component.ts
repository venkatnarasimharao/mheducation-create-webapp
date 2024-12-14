import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LogoComponent } from '../logo/logo.component';
import { DropdownSelectComponent } from '../dropdown-select/dropdown-select.component';
import { SharedstateService } from '../services/sharedstate.service';
import { MenuCdkComponent } from '../menu-cdk/menu-cdk.component';

@Component({
  selector: 'header',
  standalone: true,
  imports: [
    RouterLink,LogoComponent,DropdownSelectComponent,MenuCdkComponent
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  brandName: string = "Create";
  selectedLanguage: string="";
  selectedAccountType: string = '';
  
  constructor(private sharedstateService: SharedstateService, private translate: TranslateService) {}
  //this.sharedstateService
  
  // languages = [

  //   { value: 'english', label: 'English' },
  //   { value: 'catala', label: 'Català' },
  //   { value: 'italiano', label: 'Italiano' },
  //   { value: 'castellano', label: 'Español (Castellano)' },
  //   { value: 'arabic', label: 'عربي' }
  // ];
  languages: { value: string, label: string,dir:string }[] = []; 
  // ngOnInit() {
  //  this.sharedstateService.getLanguages();
  //  this.languages=this.sharedstateService.getLanguagesSignal()();
  //  this.languages = this.languages?.map(lang => ({
  //   value: lang.name._text,  // Assuming name._text contains the language code
  //   label: lang.displayValue._text  // Assuming displayValue._text contains the language display name
  // }))
  // }
  ngOnInit(): void {
    // Fetch the languages from the service
    this.sharedstateService.getLanguages();

    // Directly accessing the signal to get the current value
    const languagesSignal = this.sharedstateService.getLanguagesSignal();

    // Check if the signal has any value, if so map it to the desired format
    if (languagesSignal()) {
      const language = languagesSignal();
      console.log(language);
     if(language && Array.isArray(language)  ){
      this.languages = language.map((lang:any)=>{
           return {
            value : lang.name._text,
            label : lang.displayValue._text,
            dir: lang.direction._text
           }
      })
     }
    }
  }
  accountType = [
    { value: 'My Account', label: 'My Account' },
    { value: 'Login', label: 'Login' },
    { value: 'Register', label: 'Register' },
  ];
  
  onLanguageChange(Language:any):void{
    this.selectedLanguage =Language;
    this.translate.use(Language);
    if (this.selectedLanguage === "arabic") {
      document.documentElement.dir = 'rtl';
    } else {
      document.documentElement.dir = 'ltr';
    }
  }
  onAccountTypeChange(Account:any):void{
    this.selectedAccountType =Account;
  }

}