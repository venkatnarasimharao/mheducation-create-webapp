import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-dropdown-select',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dropdown-select.component.html',
  styleUrl: './dropdown-select.component.scss'
})
export class DropdownSelectComponent {
  @Output() selectedItem: EventEmitter<string> = new EventEmitter<string>();
  @Input() items: any[] = [];

  async onChange(event: Event) {
    const selectedValue = (event.target as HTMLSelectElement).value;
    this.selectedItem.emit(selectedValue);
  }
}


