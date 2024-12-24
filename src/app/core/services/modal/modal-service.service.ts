import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalContentComponent } from '../../../shared/components/modal/modal-content/modal-content.component';
@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(private modalService: NgbModal) { }
  openModal(title: string, items: string[]): Promise<any> {
    const modalRef = this.modalService.open(ModalContentComponent);
    modalRef.componentInstance.data = { title, items };
    return modalRef.result;
  }
}

// for using the modalService

// openLanguageModal() {
//   this.modalService.openModal('Languages', this.languages()).then((selectedItem: any) => {
//     this.handleLanguageSettings(selectedItem.locale._text);
//     sessionStorage.setItem("selectedLanguage", selectedItem.locale._text);
//   }).catch(() => {
//     console.log('Modal dismissed');
//   });

// }