import { Component, inject, Input } from '@angular/core';
import { AccordionItem } from '../../models/search.model';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'hec-filter-accordion',
  standalone: true,
  imports: [NgbAccordionModule, TranslateModule],
  templateUrl: './filter-accordion.component.html',
  styleUrl: './filter-accordion.component.scss'
})
export class FilterAccordionComponent {
  translate: TranslateService = inject(TranslateService); 
  
  @Input() collectionfilterData: AccordionItem[] = [];

  onCheckBoxChange(event: Event, item: any) {
    const isChecked = (event.target as HTMLInputElement).checked;
    console.log(`the ${item.label} checkbox  is ${isChecked ? 'checked' : 'unchecked'}`);
  }
}
