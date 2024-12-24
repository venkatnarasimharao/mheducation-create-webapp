import { Component, Inject, OnInit } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { SharedstateService } from '../../../core/services/shared-state/sharedstate.service';
import { DOCUMENT } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'footer',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent implements OnInit {
  constructor(
    private sharedstateService: SharedstateService,
    private translate: TranslateService,
    private modalService: NgbModal,
    @Inject(DOCUMENT) private document: Document) { }

  regionList: any = [{ displayValue: { _text: 'Asia' } }, { displayValue: { _text: 'Europe' } }, { displayValue: { _text: 'United States' } }];
  languages: any;
  currentLanguage: any = sessionStorage.getItem('selectedLanguage');
  modalData = {
    title: '',
    items: [] as any
  };
  // TODO -- define modal data type

  ngOnInit(): void {
    this.languages = this.sharedstateService.getLanguagesSignal();
    if (this.currentLanguage) {
      this.handleLanguageChange(this.currentLanguage);
    }
    if (!this.languages()?.length) {
      this.sharedstateService.getLanguages();
    }
  }
  handleLanguageChange(lang: string): void {
    this.translate.use(lang).subscribe(() => {
      // Fetch translations once the language is loaded
      this.translate.get(['langCode', 'textAlign']).subscribe(translations => {
        this.document.documentElement.lang = translations['langCode'];
        this.document.documentElement.dir = translations['textAlign'];
      });
    });

  }
  openLanguageModal(content: any) {
    this.modalData.title = 'LanguagePopupTitle';
    this.modalData.items = this.languages();
    const modalRef = this.modalService.open(content, { ariaLabelledBy: 'Select Language' });
    modalRef.result
      .then((selectedItem) => {
        this.handleLanguageChange(selectedItem.locale._text);
        sessionStorage.setItem("selectedLanguage", selectedItem.locale._text);
      })
      .catch((error) => {
        console.log('Languages Modal dismissed:', error);
      });
  }
  openRegionModal(content: any) {

    this.modalData.title = 'RegionPopupTitle';

    this.modalData.items = this.regionList;
    const modalRef = this.modalService.open(content, { ariaLabelledBy: 'Select Regions' });
    modalRef.result
      .then((selectedItem) => {
        console.log('Region selected:', selectedItem);
      })
      .catch((error) => {
        console.log('Region Modal dismissed:', error);
      });
  }
  openUrl(url: string) {
    window.open(url, 'popupWindow', 'width=800,height=600,scrollbars=no,resizable=no');
  }
}

