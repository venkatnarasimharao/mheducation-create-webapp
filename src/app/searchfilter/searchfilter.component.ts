import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-searchfilter',
  standalone: true,
  imports: [NgbAccordionModule,CommonModule],
  templateUrl: './searchfilter.component.html',
  styleUrl: './searchfilter.component.scss',
})
export class SearchfilterComponent {
  list: any[] = [
    'Type',
    'Instructor Materials',
    'Publication Year',
    'Page Length',
  ];

  type: any[] = [
    { label: 'Part', value: 'option1', checked: false },
    { label: 'PartOpener', value: 'option2', checked: false },
    { label: 'Books', value: 'option3', checked: false },
    { label: 'Videos', value: 'option1', checked: false },
    { label: 'Upload', value: 'option2', checked: false },
    { label: 'Article', value: 'option3', checked: false },
    { label: 'Case', value: 'option3', checked: false },
  ];

  instructorMaterial: any[] = [
    { label: 'Available as eBook', value: 'option3', checked: false },
  ];

  publicationYear: any[] = [
    { label: '2022', value: 'option1', checked: false },
    { label: '2021', value: 'option2', checked: false },
    { label: '2020', value: 'option3', checked: false },
    { label: '2019', value: 'option1', checked: false },
    { label: '2018', value: 'option2', checked: false },
    { label: '2017', value: 'option3', checked: false },
    { label: '2016', value: 'option3', checked: false },
    { label: '2015', value: 'option3', checked: false },
    { label: '2014', value: 'option3', checked: false },
    { label: 'before 2014', value: 'option3', checked: false },
  ];

  pageLength: any[] = [
    { label: 'Brief(1-4 pages)', value: 'option1', checked: false },
    { label: 'Medium(5-9-4 pages)', value: 'option1', checked: false },
    { label: 'Long(10+ pages)', value: 'option1', checked: false },
  ];
    // Return the checkbox list based on the current item
    getCheckboxList(item: string): any[] {
      let list;
      switch (item) {
        case 'Type':
          list = this.type;
          break;
        case 'Instructor Materials':
          list = this.instructorMaterial;
          break;
        case 'Publication Year':
          list = this.publicationYear;
          break;
        case 'Page Length':
          list = this.pageLength;
          break;
        default:
          list = [];
      }
      console.log('Checkbox list for', item, ':', list);
      return list || [];
    }
    
    // Handle checkbox changes
    onCheckboxChange(item: string, checkbox: any): void {
      console.log(`Item: ${item}, Checkbox: ${checkbox.label}, Checked: ${checkbox.checked}`);
    }
}
