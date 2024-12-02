import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-drag-drop',
  standalone: true,
  imports: [
    DragDropModule,
    CommonModule
  ],
  templateUrl: './drag-drop.component.html',
  styleUrl: './drag-drop.component.scss'
})
export class DragDropComponent implements OnInit {
  todo = [
    'Get to work',
    'Pick up groceries',
    'Go home',
    'Fall asleep',
    'Walk Dog',
    'Stretch',
    'Code Stuff',
    'Drag Stuff',
    'Drop Stuff',
    'Run',
    'Walk'
  ];

  done = [
    'Get up',
    'Brush teeth',
    'Take a shower',
    'Check e-mail',
    'Walk dog'
  ];

  constructor() { }

  ngOnInit(): void {
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  handleKeydown(event: KeyboardEvent, listName: 'todo' | 'done', index: number): void {
    if (event.ctrlKey) {
      const list = this[listName];
      if (event.key === 'ArrowUp' && index > 0) {
        // Move item up
        [list[index - 1], list[index]] = [list[index], list[index - 1]];
        this.focusItem(event.target as HTMLElement, index - 1);
      } else if (event.key === 'ArrowDown' && index < list.length - 1) {
        // Move item down
        [list[index + 1], list[index]] = [list[index], list[index + 1]];
        this.focusItem(event.target as HTMLElement, index + 1);
      }

      // Prevent default scrolling behavior
      event.preventDefault();
    }
  }

  focusItem(element: HTMLElement, newIndex: number): void {
    const parent = element.parentElement;
    if (parent) {
      const newItem = parent.children[newIndex] as HTMLElement;
      if (newItem) {
        newItem.focus();
      }
    }
  }
}
