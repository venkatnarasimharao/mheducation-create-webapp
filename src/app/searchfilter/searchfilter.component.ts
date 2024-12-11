import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { AlertComponentComponent } from '../alert-component/alert-component.component';
import { IAlert } from '../interface/alert';

@Component({
  selector: 'app-searchfilter',
  standalone: true,
  imports: [NgbAccordionModule,CommonModule,FormsModule,AlertComponentComponent],
  templateUrl: './searchfilter.component.html',
  styleUrl: './searchfilter.component.scss',
})
export class SearchfilterComponent {
  isChecked!:false;
  clearFilters(event: Event): void {
    event.preventDefault(); // Prevent default link behavior
    console.log('Filters cleared');
  }
  alert: IAlert = {
    type: 'success',
    message: '"Coffee Inventory Management..." added to project "Test123;" New Price: $13.84, Page Count: 123 pages'
  };
  
  lists = [
    {
      title: 'Type',
      items: [
        { label: 'Part', value: '', checked: false, exist: '(171)' },
        { label: 'PartOpener', value: '', checked: false, exist: '(183)' },
        { label: 'Books', value: '', checked: false, exist: '(13)' },
        { label: 'Videos', value: '', checked: false, exist: '(104)' },
        { label: 'Upload', value: '', checked: false, exist: '' },
        { label: 'Article', value: '', checked: false, exist: '(5)' },
        { label: 'Case', value: '', checked: false, exist: '(177)' },
      ],
    },
    {
      title: 'Instructor Materials',
      items: [
        { label: 'Available as eBook', value: '', checked: false, exist: '(305)' },
      ],
    },
    {
      title: 'Publication Year',
      items: [
        { label: '2022', value: '', checked: false, exist: '' },
        { label: '2021', value: '', checked: false, exist: '' },
        { label: '2020', value: '', checked: false, exist: '(39)' },
        { label: '2019', value: '', checked: false, exist: '' },
        { label: '2018', value: '', checked: false, exist: '(63)' },
        { label: '2017', value: '', checked: false, exist: '' },
        { label: '2016', value: '', checked: false, exist: '(27)' },
        { label: '2015', value: '', checked: false, exist: '(49)' },
        { label: '2014', value: '', checked: false, exist: '(18)' },
        { label: 'before 2014', value: '', checked: false, exist: '(104)' },
      ],
    },
    {
      title: 'Page Length',
      items: [
        { label: 'Brief (1-4 pages)', value: '', checked: false, exist: '(135)' },
        { label: 'Medium (5-9 pages)', value: '', checked: false, exist: '(27)' },
        { label: 'Long (10+ pages)', value: '', checked: false, exist: '(169)' },
      ],
    },
  ];
}
  

