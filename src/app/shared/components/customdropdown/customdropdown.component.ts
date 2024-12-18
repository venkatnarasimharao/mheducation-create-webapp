import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { NgbDropdownToggleNoCaretDirective } from '../../directives/dropdown-toggle-css.directive';
@Component({
  selector: 'hec-customdropdown',
  standalone: true,
  imports: [NgbDropdownModule, CommonModule, NgbDropdownToggleNoCaretDirective],
  templateUrl: './customdropdown.component.html',
  styleUrl: './customdropdown.component.scss'
})
export class CustomdropdownComponent {
  @Input() titleHeading:string=''
  @Input() buttonTitle: String = '';
  @Input() dropdownItem: string[] = [];
  @Output() selectedItem: EventEmitter<string> = new EventEmitter<string>();
  
  onSelect(item: string) {
    this.buttonTitle = item;
    this.selectedItem.emit(item);
  }
}
