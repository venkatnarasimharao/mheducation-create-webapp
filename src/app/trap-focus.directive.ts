import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appTrapFocus]',
  standalone: true,
})
export class TrapFocusDirective {
  // This directive will handle the keyboard navigation logic (Tab and Shift + Tab) and ensure that focus stays within the dropdown
  // Pressing Tab on the last item will cycle focus back to the first item.
  // Pressing Shift + Tab on the first item will cycle focus to the last item.
  
  @Input('appTrapFocus') dropdownMenu!: HTMLElement;

  constructor(private el: ElementRef) {}

  @HostListener('keydown', ['$event'])
  trapFocus(event: KeyboardEvent): void {
    if (!this.dropdownMenu) return;

    const items = this.dropdownMenu.querySelectorAll('button[ngbDropdownItem]');
    const firstItem = items[0] as HTMLButtonElement;
    const lastItem = items[items.length - 1] as HTMLButtonElement;

    if (!firstItem || !lastItem) return;

    if (event.key === 'Tab') {
      if (event.shiftKey && document.activeElement === firstItem) {
        // Shift + Tab on the first item: move focus to the last item
        event.preventDefault();
        lastItem.focus();
      } else if (!event.shiftKey && document.activeElement === lastItem) {
        // Tab on the last item: move focus to the first item
        event.preventDefault();
        firstItem.focus();
      }
    }
  }
}
