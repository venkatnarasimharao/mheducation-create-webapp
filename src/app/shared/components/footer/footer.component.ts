import { CommonModule } from '@angular/common';
import { Component, inject, TemplateRef } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'footer',
  standalone: true,
  imports: [TranslateModule, CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

  translate: TranslateService = inject(TranslateService);

  private modalService = inject(NgbModal);
  closeResult = '';
  selectedLanguage: string = "English";
  languages: string[] = [
    'English', '简体中文', '繁體中文', 'العربية', '한국어',
    'Italiano', 'Bahasa Malaysia', 'ภาษาไทย', '日本語', 'Català',
    'Español (Castellano)', 'Español latinoamericano'
  ];

  minRows: number = 5;

  getLanguageColumns(): string[][] {
    const result: string[][] = [];
    const chunkSize = 5;

    for (let i = 0; i < this.languages.length; i += chunkSize) {
      result.push(this.languages.slice(i, i + chunkSize));
    }

    return result;
  }
  selectLanguage(language: string): void {
    this.selectedLanguage = language;

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