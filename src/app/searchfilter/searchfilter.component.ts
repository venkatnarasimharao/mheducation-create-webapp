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
    { label: 'Part', value: '', checked: false },
    { label: 'PartOpener', value: '', checked: false },
    { label: 'Books', value: '', checked: false },
    { label: 'Videos', value: '', checked: false },
    { label: 'Upload', value: '', checked: false },
    { label: 'Article', value: '', checked: false },
    { label: 'Case', value: '', checked: false },
  ];

  instructorMaterial: any[] = [
    { label: 'Available as eBook', value: '', checked: false },
  ];

  publicationYear: any[] = [
    { label: '2022', value: '', checked: false },
    { label: '2021', value: '', checked: false },
    { label: '2020', value: '', checked: false },
    { label: '2019', value: '', checked: false },
    { label: '2018', value: '', checked: false },
    { label: '2017', value: '', checked: false },
    { label: '2016', value: '', checked: false },
    { label: '2015', value: '', checked: false },
    { label: '2014', value: '', checked: false },
    { label: 'before 2014', value: '', checked: false },
  ];

  pageLength: any[] = [
    { label: 'Brief(1-4 pages)', value: '', checked: false },
    { label: 'Medium(5-9-4 pages)', value: '', checked: false },
    { label: 'Long(10+ pages)', value: '', checked: false },
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
