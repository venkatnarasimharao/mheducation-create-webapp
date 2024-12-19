import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { AccordionItem } from '../../models/search.model';

@Component({
  selector: 'hec-filter-accordion',
  standalone: true,
  imports: [NgbAccordionModule, CommonModule, FormsModule],
  templateUrl: './filter-accordion.component.html',
  styleUrl: './filter-accordion.component.scss',
})
export class FilterAccordionComponent {
  //collectionfilter
  //collectionTypes
  @Input() collectionfilter: AccordionItem[] = [
    {
      id: 'panel1',
      header: 'Type',
      collectionTypes: [
        { label: 'Part', value: '(171)' },
        { label: 'PartOpener', value: '(183)' },
        { label: 'Books', value: '(13)' },
        { label: 'Videos', value: '(104)' },
        { label: 'Upload', value: '' },
        { label: 'Article', value: '(5)' },
        { label: 'Case', value: '(177)' },
      ],
    },
    {
      id: 'panel2',
      header: 'Instructor Materials',
      collectionTypes: [{ label: 'Available as eBook', value: '(305)' }],
    },
    {
      id: 'panel3',
      header: 'Publication Year',
      collectionTypes: [
        { label: '2022', value: '' },
        { label: '2021', value: '' },
        { label: '2020', value: '(39)' },
        { label: '2019', value: '' },
        { label: '2018', value: '(63)' },
        { label: '2017', value: '' },
        { label: '2016', value: '(27)' },
        { label: '2015', value: '(49)' },
        { label: '2014', value: '(18)' },
        { label: 'before 2014', value: '(104)' },
      ],
    },
    {
      id: 'panel4',
      header: 'Page Length',
      collectionTypes: [
        { label: 'Brief (1-4 pages)', value: '(135)' },
        { label: 'Medium (5-9 pages)', value: '(27)' },
        { label: 'Long (10+ pages)', value: '(169)' },
      ],
    },
  ];

  onCheckBoxChange(event: Event, item: any) {
    const isChecked = (event.target as HTMLInputElement).checked;
    console.log(`checkbox  is ${isChecked ? 'checked' : 'unchecked'}`);
  }
}
