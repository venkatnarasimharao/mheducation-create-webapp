import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-searchfilter',
  standalone: true,
  imports: [NgbAccordionModule,CommonModule,FormsModule],
  templateUrl: './searchfilter.component.html',
  styleUrl: './searchfilter.component.scss',
})
export class SearchfilterComponent {
  isChecked!:false;
  clearFilters(event: Event): void {
    event.preventDefault(); // Prevent default link behavior
    console.log('Filters cleared');
  }
  
  list: any[] = [
    'Type',
    'Instructor Materials',
    'Publication Year',
    'Page Length',
  ];

  type: any[] = [
    { label: 'Part', value: '', checked: false, exist:'(171)' },
    { label: 'PartOpener', value: '', checked: false, exist:'(183)' },
    { label: 'Books', value: '', checked: false, exist:'(13)' },
    { label: 'Videos', value: '', checked: false, exist:'(104)' },
    { label: 'Upload', value: '', checked: false, exist:'' },
    { label: 'Article', value: '', checked: false , exist:'(5)'},
    { label: 'Case', value: '', checked: false , exist:'(177)'},
  ];

  instructorMaterial: any[] = [
    { label: 'Available as eBook', value: '', checked: false ,exist:'(305)'},
  ];

  publicationYear: any[] = [
    { label: '2022', value: '', checked: false,exist:'' },
    { label: '2021', value: '', checked: false,exist:'' },
    { label: '2020', value: '', checked: false ,exist:'(39)'},
    { label: '2019', value: '', checked: false,exist:'' },
    { label: '2018', value: '', checked: false ,exist:'(63)'},
    { label: '2017', value: '', checked: false,exist:'' },
    { label: '2016', value: '', checked: false,exist:'(27)' },
    { label: '2015', value: '', checked: false ,exist:'(49)'},
    { label: '2014', value: '', checked: false ,exist:'(18)'},
    { label: 'before 2014', value: '', checked: false ,exist:'(104)'},
  ];

  pageLength: any[] = [
    { label: 'Brief(1-4 pages)', value: '', checked: false ,exist:'(135)'},
    { label: 'Medium(5-9-4 pages)', value: '', checked: false,exist:'(27)' },
    { label: 'Long(10+ pages)', value: '', checked: false ,exist:'(169)'},
  ];
    // Return the checkbox list based on the current item
    getCheckboxList(item: string): any[] {
      let list: any[] = [];
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
    
      // Filter out items that do not have a valid label or value
      return list.filter(checkbox => checkbox.label && checkbox.label.trim() && (checkbox.exist || '').trim());
    }
    
    
    // Handle checkbox changes
    onCheckboxChange(item: string, checkbox: any): void {
      console.log(`Item: ${item}, Checkbox: ${checkbox.label}, Checked: ${checkbox.checked}`);
    }
}
