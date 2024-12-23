import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
// import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'hec-modal-content',
  standalone: true,
  imports: [],
  templateUrl: './modal-content.component.html',
  styleUrl: './modal-content.component.scss'
})
export class ModalContentComponent {
  @Input() data!: { title: string; items: any };
  @Output() itemSelected: any = new EventEmitter<any>();
  constructor(public activeModal: NgbActiveModal) { }
  selectItem(item: any) {
    this.itemSelected.emit(item);
    this.activeModal.close(item);
  }

}
