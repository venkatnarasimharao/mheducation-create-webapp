import {
  CdkDrag,
  CdkDragDrop,
  DragDropModule,
  moveItemInArray,
  transferArrayItem,
  CdkDropList,
} from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbCollapseModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'hec-arrange',
  standalone: true,
  imports: [NgbModule, NgbCollapseModule, FormsModule, CdkDrag, DragDropModule],
  templateUrl: './arrange.component.html',
  styleUrls: ['./arrange.component.scss'],
})
export class ArrangeComponent {
  isCollapsed: { [key: string]: boolean } = {
    introMaterial: false,
    bookContent: false,
    backMaterials: false,
    supplements: false,
  };
  selectAllChecked: boolean = false;
  isAnyCheckboxSelected: boolean = false;

  //dropdownTitle
  selectProjectTitle: string = 'Test123';
  selectFormatTitle: string = 'Please Select';
  selectArrangeTitle: string = 'Arrange';


  //dropdown items
  selectProjectItems: any[] = [
    { id: 1, name: 'Project 1' },
    { id: 2, name: 'Project 2' },
    { id: 3, name: 'Project 3' },
  ];

  selectFormatItems: any[] = [
    { id: 1, name: 'Format 1' },
    { id: 2, name: 'Format 2' },
    { id: 3, name: 'Format 3' },
  ];
  sections = [
    {
      id: 'introMaterial',
      title: 'Introductory Material',
      selectAllChecked: false,
      items: [
        {
          name: 'Detailed Contents',
          format: 'Color, Print & Digital',
          pages: 5,
          price: '$0.57',
          checked: false,
          disableUp: true,
          disableDown: false,
        },
        {
          name: 'Practice',
          format: 'Color, Print & Digital',
          pages: 1,
          price: '$0.57',
          checked: false,
          disableUp: false,
          disableDown: true,
        },
      ],
    },

    {
      id: 'bookContent',
      title: 'Book Content',
      selectAllChecked: false,
      items: [
        {
          name: 'Chapter 1: Basics',
          format: 'Black & White, Print & Digital',
          pages: 20,
          price: '$1.50',
          checked: false,
          disableUp: true,
          disableDown: false,
        },
        {
          name: 'Chapter 2: Advanced Topics',
          format: 'Color, Print & Digital',
          pages: 30,
          price: '$2.50',
          checked: false,
          disableUp: false,
          disableDown: false,
        },
        {
          name: 'Chapter 3: Summary',
          format: 'Black & White, Print & Digital',
          pages: 10,
          price: '$0.80',
          checked: false,
          disableUp: false,
          disableDown: true,
        },
      ],
    },

    {
      id: 'backMaterials',
      title: 'Back Materials',
      selectAllChecked: false,
      items: [
        {
          name: 'Introduction',
          format: 'Color, Print & Digital',
          pages: 5,
          price: '$0.57',
          checked: false,
          disableUp: true,
          disableDown: false,
        },
        {
          name: 'Divesting Harvard',
          format: 'Color, Print & Digital',
          pages: 5,
          price: '$0.57',
          checked: false,
          disableUp: false,
          disableDown: true,
        },
      ],
    },
    {
      id: 'supplements',
      title: 'Supplements',
      selectAllChecked: false,
      items: [
        {
          name: 'Introduction',
          format: 'Color, Print & Digital',
          pages: 5,
          price: '$0.57',
          checked: false,
          disableUp: true,
          disableDown: false,
        },
        {
          name: 'Divesting Harvard',
          format: 'Color, Print & Digital',
          pages: 5,
          price: '$0.57',
          checked: false,
          disableUp: false,
          disableDown: true,
        },
      ],
    },
  ];

  ngOnInit(): void {
    this.updateItemStates();
  }

  getAllItems() {
    return this.sections.flatMap((section) => section.items);
  }
  toggleCollapse(sectionId: string) {
    this.isCollapsed[sectionId] = !this.isCollapsed[sectionId];
  }

  toggleAllCheckboxes(section: any) {
    section.items.forEach((item: any) => {
      item.checked = section.selectAllChecked;
    });
    this.checkIfAnySelected();
  }

  checkIfAllSelected(section: any) {
    section.selectAllChecked = section.items.every((item: any) => item.checked);
    this.checkIfAnySelected();
  }

  checkIfAnySelected() {
    this.isAnyCheckboxSelected = this.sections.some((section) =>
      section.items.some((item) => item.checked)
    );
    console.log(
      'isAnyCheckboxSelected: checked triggered',
      this.isAnyCheckboxSelected
    );
  }

  toggleCheckbox(item: any) {
    item.checked = !item.checked;
    console.log('Checkbox toggled:', item);
    this.checkIfAnySelected();
  }

  deleteSelectedItems() {
    this.sections.forEach((section) => {
      section.items = section.items.filter((item) => !item.checked);
    });
    this.checkIfAnySelected();
  }
  isFirstItem(sectionIndex: number, itemIndex: number): boolean {
    const allItems = this.getAllItems();
    const globalIndex = this.getGlobalIndex(sectionIndex, itemIndex);
    return globalIndex === 0;
  }

  isLastItem(sectionIndex: number, itemIndex: number): boolean {
    const allItems = this.getAllItems();
    const globalIndex = this.getGlobalIndex(sectionIndex, itemIndex);
    return globalIndex === allItems.length - 1;
  }

  moveItemUp(sectionIndex: number, itemIndex: number): void {
    const section = this.sections[sectionIndex];
    if (itemIndex > 0) {
      [section.items[itemIndex - 1], section.items[itemIndex]] = [
        section.items[itemIndex],
        section.items[itemIndex - 1],
      ];
    } else if (sectionIndex > 0) {
      const previousSection = this.sections[sectionIndex - 1];
      const itemToMove = section.items[itemIndex];
      section.items.splice(itemIndex, 1);
      previousSection.items.push(itemToMove);
    }
  }

  moveItemDown(sectionIndex: number, itemIndex: number): void {
    const section = this.sections[sectionIndex];
    if (itemIndex < section.items.length - 1) {
      [section.items[itemIndex + 1], section.items[itemIndex]] = [
        section.items[itemIndex],
        section.items[itemIndex + 1],
      ];
    } else if (sectionIndex < this.sections.length - 1) {
      const nextSection = this.sections[sectionIndex + 1];
      const itemToMove = section.items[itemIndex];
      section.items.splice(itemIndex, 1);
      nextSection.items.unshift(itemToMove);
    }
  }

  getGlobalIndex(sectionIndex: number, itemIndex: number): number {
    const priorItemsCount = this.sections
      .slice(0, sectionIndex)
      .reduce((count, section) => count + section.items.length, 0);
    return priorItemsCount + itemIndex;
  }

  getConnectedDropLists(): string[] {
    return this.sections.map((section) => section.id);
  }

  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
    this.updateItemStates();
  }

  updateItemStates(): void {
    this.sections.forEach((section) => {
      section.items.forEach((item, index) => {
        item.disableUp = index === 0;
        item.disableDown = index === section.items.length - 1;
      });
    });
  }

  onSelect(item: { id: number; name: string }) {
    this.selectProjectTitle = item.name;
  }
}
