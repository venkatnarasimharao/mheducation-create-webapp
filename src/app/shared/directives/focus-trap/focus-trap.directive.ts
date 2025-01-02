import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[hecFocusTrap]',
  standalone: true
})
export class FocusTrapDirective {
  @Input('hecFocusTrap') dropdownMenu!: HTMLElement;
  @Input() focusableElementSelector: string = 'button';

  constructor(private el: ElementRef) {}

  @HostListener('keydown', ['$event'])
  focusTrap(event: KeyboardEvent): void {
    if (!this.dropdownMenu) return;

    const items = this.dropdownMenu.querySelectorAll(this.focusableElementSelector);
    if (!items.length) {
      console.warn('No focusable items found inside the dropdown menu.');
      return;
    }

    const firstItem = items[0] as HTMLElement | null;
    const lastItem = items[items.length - 1] as HTMLElement | null;

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
