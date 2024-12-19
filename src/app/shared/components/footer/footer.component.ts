import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, TemplateRef } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { SharedstateService } from '../../../core/services/shared-state/sharedstate.service';

@Component({
  selector: 'footer',
  standalone: true,
  imports: [TranslateModule, CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent implements OnInit {

  constructor(private sharedstateService: SharedstateService) { }
  languages: { value: string, label: string, dir: string }[] = [];
  ngOnInit(): void {
    const savedLanguage = sessionStorage.getItem('selectedLanguage');
    if (savedLanguage) {
      this.selectedLanguage = savedLanguage;
    }
    this.sharedstateService.getLanguages();
    const languagesSignal = this.sharedstateService.getLanguagesSignal();
    if (languagesSignal()) {
      const language = languagesSignal();
      console.log(language);
      if (language && Array.isArray(language)) {
        this.languages = language.map((lang: any) => {
          return {
            value: lang.name._text,
            label: lang.displayValue._text,
            dir: lang.direction._text
          }
        })
      }
    }
    console.log(this.selectedLanguage);
  }

  translate: TranslateService = inject(TranslateService);

  private modalService = inject(NgbModal);
  closeResult = '';
  selectedLanguage: string = "English";

  minRows: number = 5;
  // TODO  add api-language type in interface

  getLanguageColumns(): { value: string; label: string; dir: string }[][] {
    const result: { value: string; label: string; dir: string }[][] = [];
    const chunkSize = 5;

    for (let i = 0; i < this.languages.length; i += chunkSize) {
      result.push(this.languages.slice(i, i + chunkSize));
    }

    return result;
  }
  selectLanguage(language: { value: string; label: string; dir: string }): void {
    this.selectedLanguage = language.value;
    sessionStorage.setItem('selectedLanguage', this.selectedLanguage);

  }

  open(content: TemplateRef<any>) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      },
    );
  }

  private getDismissReason(reason: any): string {
    switch (reason) {
      case ModalDismissReasons.ESC:
        return 'by pressing ESC';
      case ModalDismissReasons.BACKDROP_CLICK:
        return 'by clicking on a backdrop';
      default:
        return `with: ${reason}`;
    }
  }

}

