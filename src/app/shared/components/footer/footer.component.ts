
import { Component, inject, OnInit, Renderer2 } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { SharedstateService } from '../../../core/services/shared-state/sharedstate.service';
import { ModalService } from '../../../core/services/modal/modal.service';

@Component({
  selector: 'footer',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent implements OnInit {
  constructor(private modalService: ModalService,
    private sharedstateService: SharedstateService,
    private renderer: Renderer2,
    private translate: TranslateService) { }

  regionList: any = [{ displayValue: { _text: 'Asia' } }, { displayValue: { _text: 'Europe' } }];
  languages: any;
  currentLanguage: any = sessionStorage.getItem('selectedLanguage');

  ngOnInit(): void {
    this.languages = this.sharedstateService.getLanguagesSignal();

    if (this.currentLanguage) {
      this.handleLanguageSettings(this.currentLanguage);
    }

    if (!this.languages()?.length) {
      this.sharedstateService.getLanguages();
    }
  }
  setTextAlignment(lang: string) {
    const htmlElement = this.renderer.selectRootElement('html', true);
    this.renderer.setAttribute(htmlElement, 'lang', lang);
    if (lang == "ar_SA") {
      this.renderer.setAttribute(htmlElement, 'dir', 'rtl');
    }
    else {
      this.renderer.setAttribute(htmlElement, 'dir', 'ltr');
    }
  }

  handleLanguageSettings(lang: string): void {
    this.translate.use(lang);
    this.setTextAlignment(lang);

  }
  openLanguageModal() {
    this.modalService.openModal('Languages', this.languages()).then((selectedItem: any) => {
      this.handleLanguageSettings(selectedItem.locale._text);
      sessionStorage.setItem("selectedLanguage", selectedItem.locale._text);
    }).catch(() => {
      console.log('Modal dismissed');
    });

  }
  openRegionModal() {
    this.modalService.openModal('Regions', this.regionList).then((selectedItem: any) => {

      console.log('Selected Item:', selectedItem);
    });
  }

  openUrl(url: string) {
    window.open(url, 'popupWindow', 'width=800,height=600,scrollbars=no,resizable=no');
  }
}
