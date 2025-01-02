import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[hecFocusTrap]',
  standalone: true
})
export class FocusTrapDirective {
  @Input('appTrapFocus') dropdownMenu!: HTMLElement;

  constructor(private el: ElementRef) { }

  @HostListener('keydown', ['$event'])
  trapFocus(event: KeyboardEvent): void {
    if (!this.dropdownMenu) return;

    const items = this.dropdownMenu.querySelectorAll('button[ngbDropdownItem]');
    const firstItem = items[0] as HTMLButtonElement;
    const lastItem = items[items.length - 1] as HTMLButtonElement;

    if (!firstItem || !lastItem) return;

    if (event.key === 'Tab') {
      if (event.shiftKey && document.activeElement === firstItem) {
        event.preventDefault();
        lastItem.focus();
      } else if (!event.shiftKey && document.activeElement === lastItem) {
        event.preventDefault();
        firstItem.focus();
      }
    }
  }
}
