import { Component, Input } from '@angular/core';
import { AccordionItem } from '../../models/search.model';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'hec-filter-accordion',
  standalone: true,
  imports: [NgbAccordionModule],
  templateUrl: './filter-accordion.component.html',
  styleUrl: './filter-accordion.component.scss'
})
export class FilterAccordionComponent {
  @Input() collectionfilterData: AccordionItem[] = [];

  onCheckBoxChange(event: Event, item: any) {
    const isChecked = (event.target as HTMLInputElement).checked;
    console.log(`the ${item.label} checkbox  is ${isChecked ? 'checked' : 'unchecked'}`);
  }
}
